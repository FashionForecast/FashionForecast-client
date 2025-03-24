import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { ClothesSliderType } from '@/entities/clothes';

import { Button } from '@/shared/ui';

import ColorButtons from './ColorButtons/ColorButtons';
import { S, C } from './ColorPalette.style';

const DRAWER_MAX_TRANSLATE_Y = -216;

const SLIDER_BUTTONS: Array<{ slider: ClothesSliderType; label: string }> = [
  { slider: 'top', label: '상의 색상' },
  { slider: 'bottom', label: '하의 색상' },
];

type ColorPaletteProps = {
  focussingSlider: ClothesSliderType;
  clothesColor: string;
  updateFocussingSlider: (
    sliderType: React.SetStateAction<ClothesSliderType>
  ) => void;
  changeClothesColor: (color: string) => () => void;
};

export const ColorPalette = memo(
  ({
    focussingSlider,
    clothesColor,
    updateFocussingSlider,
    changeClothesColor,
  }: ColorPaletteProps) => {
    const [canUpdateSlider, setCanUpdateSlider] = useState(true);
    const [isExpendedDrawer, setIsExpendedDrawer] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);
    const [dragStartPositionY, setDragStartPositionY] = useState<number | null>(
      null
    );

    const contentRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: React.PointerEvent) => {
      setIsDragging(true);
      setDragStartPositionY(e.clientY);

      const contentElement = contentRef.current;
      if (contentElement) {
        contentElement.style.height = `calc(100dvh - 56px - 72px)`;
      }
    };

    const handleDragMove = useCallback(
      (e: PointerEvent) => {
        if (!isDragging || dragStartPositionY === null) {
          return;
        }

        const dragDistance = e.clientY - dragStartPositionY;
        const absDistance = Math.abs(dragDistance);

        // drawer가 확장된 상태가 아닌 경우, 위로 확장 가능
        if (!isExpendedDrawer) {
          if (dragDistance > 0 || dragDistance < DRAWER_MAX_TRANSLATE_Y) {
            return;
          }

          if (absDistance >= 1) {
            setCanUpdateSlider(false);
          }

          setDragDistance(dragDistance);
        }

        // drawer가 확장된 상태인 경우, 아래로 축소 가능
        if (isExpendedDrawer) {
          const MAX_DRAG_DOWN = -DRAWER_MAX_TRANSLATE_Y;
          if (dragDistance < 0 || dragDistance > MAX_DRAG_DOWN) {
            return;
          }

          if (absDistance >= 1) {
            setCanUpdateSlider(false);
          }

          setDragDistance(DRAWER_MAX_TRANSLATE_Y + dragDistance);
        }
      },
      [dragStartPositionY, isDragging, isExpendedDrawer]
    );

    const handleDragEnd = useCallback(() => {
      setIsDragging(false);
      setDragStartPositionY(null);

      const THRESHOLD = 60;
      let isNewExpended = isExpendedDrawer;

      // drawer의 확장 상태와 임계값으로 drawer의 확장 또는 축소 상태를 결정
      if (!isExpendedDrawer) {
        const absDistance = Math.abs(dragDistance);

        if (absDistance <= THRESHOLD) {
          setDragDistance(0);
          isNewExpended = false;
        } else {
          setDragDistance(DRAWER_MAX_TRANSLATE_Y);
          isNewExpended = true;
        }
      }

      if (isExpendedDrawer) {
        if (dragDistance <= DRAWER_MAX_TRANSLATE_Y + THRESHOLD) {
          setDragDistance(DRAWER_MAX_TRANSLATE_Y);
          isNewExpended = true;
        } else {
          setDragDistance(0);
          isNewExpended = false;
        }
      }

      setIsExpendedDrawer(isNewExpended);

      const contentElement = contentRef.current;
      if (contentElement) {
        const height = isNewExpended
          ? 'calc(100dvh - 56px - 80px - 64px - 58px)'
          : 'calc(100dvh - 56px - 80px - 278px - 58px)';

        setTimeout(() => {
          contentElement.style.height = height;
        }, 200);
      }
    }, [dragDistance, isExpendedDrawer]);

    const handleSelectClothesButtonClick = () => {
      setIsDragging(false);
      setIsExpendedDrawer(false);
      setDragDistance(0);
    };

    const handleSliderButtonClick = (
      e: React.MouseEvent,
      slider: ClothesSliderType
    ) => {
      e.stopPropagation();
      updateFocussingSlider(canUpdateSlider ? slider : focussingSlider);
      setCanUpdateSlider(true);
    };

    /** pointerup, pointermove 이벤트 등록 */
    useEffect(() => {
      window.addEventListener('pointerup', handleDragEnd);
      window.addEventListener('pointermove', handleDragMove);

      return () => {
        window.removeEventListener('pointerup', handleDragEnd);
        window.removeEventListener('pointermove', handleDragMove);
      };
    }, [handleDragEnd, handleDragMove]);

    return (
      <S.Drawer $isDragging={isDragging} $dragDistance={dragDistance}>
        <S.SelectClothesButtonWrap $isVisible={isExpendedDrawer}>
          <Button
            variant='outlined'
            size='large'
            fullWidth
            onClick={handleSelectClothesButtonClick}
          >
            옷 고르기
          </Button>
        </S.SelectClothesButtonWrap>

        <S.ColorPaletteWrap $isDragging={isDragging}>
          <S.DraggableArea onPointerDown={handleDragStart}>
            <S.HandleBar />
            <S.ButtonGroup>
              {SLIDER_BUTTONS.map(({ label, slider }) => (
                <C.SliderButton
                  key={slider}
                  value={slider}
                  size='large'
                  selected={focussingSlider === slider}
                  onClick={(e) => handleSliderButtonClick(e, slider)}
                >
                  {label}
                </C.SliderButton>
              ))}
            </S.ButtonGroup>
          </S.DraggableArea>

          <S.ContentWrap ref={contentRef}>
            <S.PaletteWrap>
              <ColorButtons
                clothesColor={clothesColor}
                changeClothesColor={changeClothesColor}
              />
            </S.PaletteWrap>
          </S.ContentWrap>
        </S.ColorPaletteWrap>
      </S.Drawer>
    );
  }
);
