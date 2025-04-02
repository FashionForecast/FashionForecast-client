import { Fragment, memo } from 'react';

import { PALETTE_COLORS, PALETTE_COLORS_TYPE } from '@/entities/clothes';

import { theme } from '@/shared/styles';
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
        {PALETTE_COLORS.map((color, index) => (
          <Fragment key={index}>
            {color === null && <div />}

            {color && (
              <S.ColorButton $color={color} onClick={updateClothesColor(color)}>
                {selectedSliderClothesColor === color && (
                  <S.IconWrap>
                    <CheckCircleIcon
                      color={DARK_CHECK_ICON.has(color) ? 'dark' : 'white'}
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

const {
  blueGrey,
  red,
  deepOrange,
  orange,
  amber,
  yellow,
  lime,
  lightGreen,
  green,
  teal,
  cyan,
  lightBlue,
  blue,
  indigo,
  deepPurple,
  purple,
  pink,
} = theme.colors;

const DARK_CHECK_ICON = new Set<PALETTE_COLORS_TYPE>([
  blueGrey[50],
  blueGrey[100],
  blueGrey[300],
  red[300],
  deepOrange[300],
  orange[300],
  amber[300],
  yellow[200],
  lime[200],
  red[100],
  deepOrange[100],
  orange[100],
  amber[100],
  yellow[100],
  lime[100],
  lightGreen[300],
  green[300],
  teal[300],
  cyan[300],
  lightBlue[300],
  blue[300],
  lightGreen[100],
  green[100],
  teal[100],
  cyan[100],
  lightBlue[100],
  blue[100],
  indigo[300],
  deepPurple[300],
  purple[300],
  pink[300],
  indigo[100],
  deepPurple[100],
  purple[100],
  pink[100],
]);
