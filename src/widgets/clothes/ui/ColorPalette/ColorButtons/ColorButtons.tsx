import { Fragment, memo } from 'react';

import { COLOR_PALETTES } from '@/widgets/clothes/model/consts';

import { theme } from '@/shared/styles';
import { CheckCircleIcon } from '@/shared/ui';

import { S } from './ColorButtons.style';

type ColorButtonsProps = {
  selectedSliderClothesColor: string;
  updateClothesColor: (color: string) => () => void;
};

const { blueGrey } = theme.colors;
const CHECK_DARK = new Set<string>([
  blueGrey[50],
  blueGrey[100],
  blueGrey[300],
]);

export const ColorButtons = memo(
  ({ selectedSliderClothesColor, updateClothesColor }: ColorButtonsProps) => {
    return (
      <>
        {COLOR_PALETTES.map((color, index) => (
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
