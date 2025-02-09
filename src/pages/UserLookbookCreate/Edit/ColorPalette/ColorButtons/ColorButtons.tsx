import { C, S } from './ColorButtons.style';
import CheckCircleIcon from '@/components/icon/CheckCircleIcon';
import { COLOR_PALETTES } from '@/constants/colorPalettes';
import { memo } from 'react';

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
