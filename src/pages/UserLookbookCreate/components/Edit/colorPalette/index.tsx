import TshirtIcon from '@/components/icon/TshirtIcon';
import ShortsIcon from '@/assets/svg/shorts.svg?react';
import { FocussingSliderType } from '..';
import { S } from './style';
import { ColorPalettes } from '@/constants/Lookbook/data';

type ColorPaletteProps = {
  focussingSlider: FocussingSliderType;
};

const ColorPalette = ({ focussingSlider }: ColorPaletteProps) => {
  return (
    <S.ColorPaletteWrap>
      <S.HandleBar />
      <S.TitleWrap>
        <S.Icon>
          {focussingSlider === 'bottom' ? (
            <ShortsIcon />
          ) : (
            <TshirtIcon color='white' />
          )}
        </S.Icon>
        <span>{`${getTitleText(focussingSlider)} 색상`}</span>
      </S.TitleWrap>

      <S.PaletteWrap $isColor={focussingSlider ? true : false}>
        {!focussingSlider && <span>상의 또는 하의를 먼저 선택해 주세요</span>}
        {focussingSlider &&
          ColorPalettes.map((color) => (
            <S.ColorButton key={color} variant='contained' $color={color} />
          ))}
      </S.PaletteWrap>
    </S.ColorPaletteWrap>
  );
};

export default ColorPalette;

function getTitleText(focussingSlider: FocussingSliderType) {
  if (focussingSlider === 'top') return '상의';
  else if (focussingSlider === 'bottom') return '하의';
  return '옷';
}
