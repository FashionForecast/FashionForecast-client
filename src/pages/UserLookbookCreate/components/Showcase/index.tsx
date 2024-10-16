import { useState } from 'react';
import { S } from './style';
import ClothesSlider from './components/ClothesSlider';
import { MAN_BOTTOM_CLOTHES, MAN_TOP_COLTHES } from '@/constants/Lookbook/data';

export type SliderType = 'TOP' | 'BOTTOM' | null;

const Showcase = () => {
  const [targetSlider, setTargetSlider] = useState<SliderType>(null);
  const handleSliderClick = (slider: SliderType) => () => {
    setTargetSlider(slider);
  };

  return (
    <>
      <S.ShowcaseWrap $isFocussing={targetSlider}>
        <S.TopWrap>
          <ClothesSlider
            items={MAN_TOP_COLTHES}
            $isFocussingSlider={targetSlider === 'TOP'}
            handleSliderClick={handleSliderClick('TOP')}
          />
        </S.TopWrap>

        <ClothesSlider
          items={MAN_BOTTOM_CLOTHES}
          $isFocussingSlider={targetSlider === 'BOTTOM'}
          handleSliderClick={handleSliderClick('BOTTOM')}
        />
      </S.ShowcaseWrap>
    </>
  );
};

export default Showcase;
