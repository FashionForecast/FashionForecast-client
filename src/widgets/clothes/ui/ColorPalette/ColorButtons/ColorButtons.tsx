import { Fragment, memo } from 'react';

import { COLOR_PALETTES } from '@/widgets/clothes/model/consts';

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
        {COLOR_PALETTES.map((color, index) => (
          <Fragment key={index}>
            {color === null && <div />}

            {color && (
              <S.ColorButton $color={color} onClick={updateClothesColor(color)}>
                {selectedSliderClothesColor === color && (
                  <S.IconWrap>
                    <CheckCircleIcon
                      color={color == '#F9FAFB' ? 'dark' : 'white'}
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
