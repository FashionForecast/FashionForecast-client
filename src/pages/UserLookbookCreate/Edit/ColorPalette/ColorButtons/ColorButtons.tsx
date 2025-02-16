import { memo } from 'react';

import { COLOR_PALETTES } from '@/shared/consts';
import { CheckCircleIcon } from '@/shared/ui';

import { C, S } from './ColorButtons.style';

type ColorButtonsProps = {
  clothesColor: string;
  changeClothesColor: (color: string) => () => void;
};

const ColorButtons = ({
  clothesColor,
  changeClothesColor,
}: ColorButtonsProps) => {
  return (
    <>
      {COLOR_PALETTES.map((color) => (
        <C.ColorButton
          key={color}
          variant='contained'
          $color={color}
          onClick={changeClothesColor(color)}
        >
          {clothesColor === color && (
            <S.Mark>
              <CheckCircleIcon color={color == '#F9FAFB' ? 'dark' : 'white'} />
            </S.Mark>
          )}
        </C.ColorButton>
      ))}
    </>
  );
};

export default memo(ColorButtons);
