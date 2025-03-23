import { memo, useEffect, useRef, useState } from 'react';

import { ClothesSliderType } from '@/entities/clothes';

import ColorButtons from './ColorButtons/ColorButtons';
import { S, C } from './ColorPalette.style';

type ColorPaletteProps = {
  focussingSlider: ClothesSliderType;
  clothesColor: string;
  updateFocussingSlider: (
    sliderType: React.SetStateAction<ClothesSliderType>
  ) => void;
  changeClothesColor: (color: string) => () => void;
};

const SLIDER_BUTTONS: Array<{ slider: ClothesSliderType; label: string }> = [
  { slider: 'top', label: '상의 색상' },
  { slider: 'bottom', label: '하의 색상' },
];

export const ColorPalette = memo(
  ({
    focussingSlider,
    clothesColor,
    updateFocussingSlider,
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
            <S.ButtonGroup>
              {SLIDER_BUTTONS.map(({ label, slider }) => (
                <C.SliderButton
                  key={slider}
                  value={slider}
                  size='large'
                  selected={focussingSlider === slider}
                  onClick={() => updateFocussingSlider(slider)}
                >
                  {label}
                </C.SliderButton>
              ))}
            </S.ButtonGroup>
          </S.DraggableArea>

          <S.PaletteWrap ref={palleteRef}>
            <ColorButtons
              clothesColor={clothesColor}
              changeClothesColor={changeClothesColor}
            />
          </S.PaletteWrap>
        </S.ColorPaletteWrap>
      </S.Drawer>
    );
  }
);
