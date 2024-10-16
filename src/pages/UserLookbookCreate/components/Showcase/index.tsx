import { useState } from 'react';
import BottomList from './BottomList';
import { S } from './style';
import TopList from './TopList';

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
          <TopList
            $isFocussingSlider={targetSlider === 'TOP'}
            handleSliderClick={handleSliderClick('TOP')}
          />
        </S.TopWrap>

        <BottomList
          $isFocussingSlider={targetSlider === 'BOTTOM'}
          handleSliderClick={handleSliderClick('BOTTOM')}
        />
      </S.ShowcaseWrap>
    </>
  );
};

export default Showcase;
