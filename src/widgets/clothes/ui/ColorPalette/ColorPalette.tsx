import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { HEADLINE_HEIGHT } from '@/pages/UserLookbookCreate';

import { ClothesSliderType } from '@/entities/clothes';

import { HEADER_HEIGHT } from '@/shared/consts';
import { Button } from '@/shared/ui';

import {
  DRAGGABLE_AREA_HEIGHT,
  SELECT_CLOTHES_BUTTON_WRAP_HEIGHT,
  SHOWCASE_HEIGHT,
} from '../../model/consts';

import { ColorButtons } from './ColorButtons/ColorButtons';
import { S, C } from './ColorPalette.style';

const DRAWER_MAX_TRANSLATE_Y = -214;

const SLIDER_BUTTONS: Array<{ slider: ClothesSliderType; label: string }> = [
  { slider: 'top', label: '상의 색상' },
  { slider: 'bottom', label: '하의 색상' },
];

type ColorPaletteProps = {
  focussingSlider: ClothesSliderType;
  selectedSliderClothesColor: string;
  updateFocussingSlider: (
    sliderType: React.SetStateAction<ClothesSliderType>
  ) => void;
  updateClothesColor: (color: string) => () => void;
};

export const ColorPalette = memo(
  ({
    focussingSlider,
    selectedSliderClothesColor,
    updateFocussingSlider,
    updateClothesColor,
  }: ColorPaletteProps) => {
    const [canUpdateSlider, setCanUpdateSlider] = useState(true);
    const [isExpandedDrawer, setIsExpandedDrawer] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);
    const [dragStartPositionY, setDragStartPositionY] = useState<number | null>(
      null
    );
    const [isFirstMove, setIsFirstMove] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: React.PointerEvent) => {
      setIsDragging(true);
      setDragStartPositionY(e.clientY);
    };

    const handleDragMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging || dragStartPositionY === null) {
          return;
        }

        const dragDistance = e.clientY - dragStartPositionY;
        const absDistance = Math.abs(dragDistance);

        if (isUnableToMove(dragDistance, isExpandedDrawer)) {
          return;
        }

        const contentElement = contentRef.current;
        if (!isFirstMove && contentElement) {
          setIsFirstMove(true);
          const height = `calc(100dvh - ${HEADER_HEIGHT} - ${HEADER_HEIGHT})`;
          contentElement.style.height = height;
        }

        if (absDistance >= 1) {
          setCanUpdateSlider(false);
        }

        let validDistance;
        if (!isExpandedDrawer) validDistance = dragDistance;
        else validDistance = DRAWER_MAX_TRANSLATE_Y + dragDistance;

        setDragDistance(validDistance);
      },
      [dragStartPositionY, isDragging, isExpandedDrawer, isFirstMove]
    );

    const handleDragEnd = useCallback(() => {
      setIsDragging(false);
      setDragStartPositionY(null);
      setIsFirstMove(false);

      const { nextDistance, isNextExpanded } = calculateNextDrawerState(
        dragDistance,
        isExpandedDrawer
      );

      setDragDistance(nextDistance);
      setIsExpandedDrawer(isNextExpanded);

      const contentElement = contentRef.current;
      if (contentElement) {
        const MIDDLE_HEIGHT = isNextExpanded
          ? SELECT_CLOTHES_BUTTON_WRAP_HEIGHT
          : SHOWCASE_HEIGHT;
        const height = `calc(100dvh - ${HEADER_HEIGHT} - ${HEADLINE_HEIGHT} - ${MIDDLE_HEIGHT} - ${DRAGGABLE_AREA_HEIGHT})`;

        setTimeout(() => {
          contentElement.style.height = height;
        }, 200);
      }
    }, [dragDistance, isExpandedDrawer]);

    const handleSelectClothesButtonClick = () => {
      setIsDragging(false);
      setIsExpandedDrawer(false);
      setDragDistance(0);
      setCanUpdateSlider(true);
    };

    const handleSliderButtonClick = (
      e: React.MouseEvent | React.TouchEvent,
      newSlider: ClothesSliderType
    ) => {
      e.stopPropagation();
      updateFocussingSlider(canUpdateSlider ? newSlider : focussingSlider);
      setCanUpdateSlider(true);
    };

    /** pointerup, pointermove 이벤트 등록 */
    useEffect(() => {
      if (isDragging) {
        window.addEventListener('pointerup', handleDragEnd);
        window.addEventListener('pointermove', handleDragMove);
      }

      return () => {
        window.removeEventListener('pointerup', handleDragEnd);
        window.removeEventListener('pointermove', handleDragMove);
      };
    }, [isDragging, handleDragEnd, handleDragMove]);

    return (
      <S.DrawerWrap $isDragging={isDragging} $dragDistance={dragDistance}>
        <S.SelectClothesButtonWrap $isVisible={isExpandedDrawer}>
          <Button
            variant='outlined'
            size='large'
            fullWidth
            onClick={handleSelectClothesButtonClick}
          >
            옷 고르기
          </Button>
        </S.SelectClothesButtonWrap>

        <S.Drawer>
          <S.DraggableArea onPointerDown={handleDragStart}>
            <S.HandleBar />
            <S.ButtonGroup>
              {SLIDER_BUTTONS.map(({ label, slider }) => (
                <C.SliderButton
                  key={slider}
                  value={slider}
                  size='large'
                  selected={focussingSlider === slider}
                  onMouseUp={(e) => handleSliderButtonClick(e, slider)}
                  onTouchEnd={(e) => handleSliderButtonClick(e, slider)}
                >
                  {label}
                </C.SliderButton>
              ))}
            </S.ButtonGroup>
          </S.DraggableArea>

          <S.ContentWrap ref={contentRef}>
            <S.PaletteWrap>
              <ColorButtons
                selectedSliderClothesColor={selectedSliderClothesColor}
                updateClothesColor={updateClothesColor}
              />
            </S.PaletteWrap>
          </S.ContentWrap>
        </S.Drawer>
      </S.DrawerWrap>
    );
  }
);

/** drawer의 이동 가능 여부 판별 */
function isUnableToMove(dragDistance: number, isExpandedDrawer: boolean) {
  // 드래그 시작 시, drawer가 축소된 상태
  if (!isExpandedDrawer) {
    return dragDistance > 0 || dragDistance < DRAWER_MAX_TRANSLATE_Y;
  }

  // 드래그 시작 시, drawer가 확장된 상태
  const MAX_DRAG_DOWN = -DRAWER_MAX_TRANSLATE_Y;
  return dragDistance < 0 || dragDistance > MAX_DRAG_DOWN;
}

/** 드래그 거리와 임계점을 비교하여, drawer의 다음 상태를 계산 */
function calculateNextDrawerState(
  dragDistance: number,
  isExpandedDrawer: boolean
) {
  const THRESHOLD = 60;
  let nextDistance = dragDistance;
  let isNextExpanded = isExpandedDrawer;

  // 드래그 시작 시, drawer가 축소된 상태
  if (!isExpandedDrawer) {
    const absDistance = Math.abs(dragDistance);

    if (absDistance <= THRESHOLD) {
      nextDistance = 0;
      isNextExpanded = false;
    } else {
      nextDistance = DRAWER_MAX_TRANSLATE_Y;
      isNextExpanded = true;
    }
  }

  // 드래그 시작 시, drawer가 확장된 상태
  if (isExpandedDrawer) {
    if (dragDistance <= DRAWER_MAX_TRANSLATE_Y + THRESHOLD) {
      nextDistance = DRAWER_MAX_TRANSLATE_Y;
      isNextExpanded = true;
    } else {
      nextDistance = 0;
      isNextExpanded = false;
    }
  }

  return {
    nextDistance,
    isNextExpanded,
  };
}
