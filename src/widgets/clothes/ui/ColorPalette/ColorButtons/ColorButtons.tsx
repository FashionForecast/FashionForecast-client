import { memo } from 'react';

import { COLOR_PALETTES } from '@/shared/consts';
import { CheckCircleIcon } from '@/shared/ui';

import { S } from './ColorButtons.style';

type ColorButtonsProps = {
  selectedSliderClothesColor: string;
  updateClothesColor: (color: string) => () => void;
};

export const ColorButtons = memo(
  ({ selectedSliderClothesColor, updateClothesColor }: ColorButtonsProps) => {
    return (
      <>
        {COLOR_PALETTES.map((color) => (
          <S.ColorButton
            key={color}
            $color={color}
            onClick={updateClothesColor(color)}
          >
            {selectedSliderClothesColor === color && (
              <S.IconWrap>
                <CheckCircleIcon
                  color={color == '#F9FAFB' ? 'dark' : 'white'}
                />
              </S.IconWrap>
            )}
          </S.ColorButton>
        ))}
      </>
    );
  }
);
