import TshirtIcon from '@/components/icon/TshirtIcon';
import ShortsIcon from '@/assets/svg/shorts.svg?react';
import { FocussingSliderType } from '..';
import { S } from './style';
import { ColorPalettes } from '@/constants/Lookbook/data';
import { memo, useEffect, useRef, useState } from 'react';
import CheckCircleIcon from '@/components/icon/CheckCircle';
import CustomButton from '@/components/CustomMui/CustomButton';

type ColorPaletteProps = {
  focussingSlider: FocussingSliderType;
  clothesColor: string;
  changeClothesColor: (color: string) => () => void;
};

const ColorPalette = ({
  focussingSlider,
  clothesColor,
  changeClothesColor,
}: ColorPaletteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const palleteRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeight = useRef(0);

  const handleDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);

    startYRef.current = e.clientY;
    startHeight.current = parseInt(String(drawerRef.current?.clientHeight));
  };

  const handleDragging = (e: React.PointerEvent) => {
    if (!isDraggable || !isDragging) return;

    const delta = startYRef.current - e.clientY;
    const newHeight = startHeight.current + delta;

    updateHeight(newHeight);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (startHeight.current === 0) return;

    const drawerHeight = drawerRef.current?.clientHeight || 0;
    const distance = Math.abs(drawerHeight - startHeight.current);

    if (drawerHeight === startHeight.current) return;

    // drawer를 위로 드래그 했을 때
    if (drawerHeight > startHeight.current) {
      if (distance >= 100) updateHeight('max');
      else updateHeight('min');
      return;
    }

    // drawer를 밑으로 드래그 했을 때
    if (distance >= 100) updateHeight('min');
    else updateHeight('max');
  };

  const updateHeight = (height: number | 'max' | 'min') => {
    if (!drawerRef.current) return;

    const drawerElment = drawerRef.current;

    if (height === 'max' || height === 'min') {
      drawerElment.style.height = `${height === 'max' ? 9999 : 0}px`;
      setIsOpen(height === 'max' ? true : false);
      return;
    }

    drawerElment.style.height = `${height}px`;
  };

  const handleChooseButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    updateHeight('min');
    setTimeout(() => setIsDragging(false), 100);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handleDragEnd);
    return () => window.removeEventListener('pointerup', handleDragEnd);
  }, []);

  useEffect(() => {
    const palleteElment = palleteRef.current;
    if (!palleteElment) return;

    const { clientHeight, scrollHeight } = palleteElment;

    if (clientHeight < scrollHeight) {
      setIsDraggable(true);
      return;
    }

    setIsDraggable(false);
  }, [focussingSlider]);

  return (
    <S.Drawer ref={drawerRef} $isDragging={isDragging}>
      <S.ColorPaletteWrap>
        <S.DraggableArea
          onPointerDown={handleDragStart}
          onPointerMove={handleDragging}
        >
          <S.HandleBar $isDraggable={isDraggable} />
          <S.InfoBar>
            <S.Info>
              <S.Icon>
                {focussingSlider === 'bottom' ? (
                  <ShortsIcon />
                ) : (
                  <TshirtIcon color='white' />
                )}
              </S.Icon>
              <span>{`${getTitleText(focussingSlider)} 색상`}</span>
            </S.Info>

            {isOpen && (
              <CustomButton onClick={handleChooseButtonClick}>
                옷 고르기
              </CustomButton>
            )}
          </S.InfoBar>
        </S.DraggableArea>

        <S.PaletteWrap
          ref={palleteRef}
          $isColor={focussingSlider ? true : false}
        >
          {!focussingSlider && <span>상의 또는 하의를 먼저 선택해 주세요</span>}
          {focussingSlider &&
            ColorPalettes.map((color) => (
              <S.ColorButton
                key={color}
                variant='contained'
                $color={color}
                onClick={changeClothesColor(color)}
              >
                {clothesColor === color && (
                  <S.Mark>
                    <CheckCircleIcon
                      color={color == '#F9FAFB' ? 'dark' : 'white'}
                    />
                  </S.Mark>
                )}
              </S.ColorButton>
            ))}
        </S.PaletteWrap>
      </S.ColorPaletteWrap>
    </S.Drawer>
  );
};

export default memo(ColorPalette);

function getTitleText(focussingSlider: FocussingSliderType) {
  if (focussingSlider === 'top') return '상의';
  else if (focussingSlider === 'bottom') return '하의';
  return '옷';
}
