import { ColorPalettes } from '@/constants/Lookbook/data';
import { C, S } from './style';
import CheckCircleIcon from '@/components/icon/CheckCircle';
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
      {ColorPalettes.map((color) => (
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
