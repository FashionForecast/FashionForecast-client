import { Fragment, memo } from 'react';

import { PALETTE_COLORS, PALETTE_COLORS_TYPE } from '@/entities/clothes';

import { theme } from '@/shared/styles';
import { CheckCircleIcon } from '@/shared/ui';

import { S } from './ColorButtons.style';

type ColorButtonsProps = {
  selectedSliderClothesColor: string;
  updateClothesColor: (color: string) => () => void;
};

const { blueGrey } = theme.colors;
const CHECK_DARK = new Set<PALETTE_COLORS_TYPE>([
  blueGrey[50],
  blueGrey[100],
  blueGrey[300],
]);

export const ColorButtons = memo(
  ({ selectedSliderClothesColor, updateClothesColor }: ColorButtonsProps) => {
    return (
      <>
        {PALETTE_COLORS.map((color, index) => (
          <Fragment key={index}>
            {color === null && <div />}

            {color && (
              <S.ColorButton $color={color} onClick={updateClothesColor(color)}>
                {selectedSliderClothesColor === color && (
                  <S.IconWrap>
                    <CheckCircleIcon
                      color={CHECK_DARK.has(color) ? 'dark' : 'white'}
                    />
                  </S.IconWrap>
                )}
              </S.ColorButton>
            )}
          </Fragment>
        ))}
      </>
    );
  }
);
