import { useRef, useState } from 'react';
import { S } from './style';
import ClothesSlider from './components/ClothesSlider';
import { MAN_BOTTOM_CLOTHES, MAN_TOP_COLTHES } from '@/constants/Lookbook/data';

export type SliderType = 'TOP' | 'BOTTOM' | null;

const Showcase = () => {
  const [targetSlider, setTargetSlider] = useState<SliderType>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const handleSliderClick = (slider: SliderType) => () => {
    setTargetSlider(slider);
  };
  const cancleFocusingClick = () => (e: React.MouseEvent) => {
    if (showcaseRef.current && showcaseRef.current === e.target) {
      setTargetSlider(null);
    }
  };

  return (
    <>
      <S.ShowcaseWrap
        ref={showcaseRef}
        $isFocussing={targetSlider}
        onClick={cancleFocusingClick()}
      >
        <div className='slider-wrap top'>
          <ClothesSlider
            items={MAN_TOP_COLTHES}
            $isFocussingSlider={targetSlider === 'TOP'}
            handleSliderClick={handleSliderClick('TOP')}
          />
        </div>

        <div className='slider-wrap bottom'>
          <ClothesSlider
            items={MAN_BOTTOM_CLOTHES}
            $isFocussingSlider={targetSlider === 'BOTTOM'}
            handleSliderClick={handleSliderClick('BOTTOM')}
          />
        </div>
      </S.ShowcaseWrap>
    </>
  );
};

export default Showcase;
