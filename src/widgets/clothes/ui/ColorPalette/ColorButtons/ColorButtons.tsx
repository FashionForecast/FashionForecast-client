import { memo } from 'react';

import { COLOR_PALETTES } from '@/shared/consts';
import { CheckCircleIcon } from '@/shared/ui';

import { S } from './ColorButtons.style';

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
        <S.ColorButton
          key={color}
          $color={color}
          onClick={changeClothesColor(color)}
        >
          {clothesColor === color && (
            <S.IconWrap>
              <CheckCircleIcon color={color == '#F9FAFB' ? 'dark' : 'white'} />
            </S.IconWrap>
          )}
        </S.ColorButton>
      ))}
    </>
  );
};

export default memo(ColorButtons);
