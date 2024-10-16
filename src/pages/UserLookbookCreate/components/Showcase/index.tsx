import { useRef, useState } from 'react';
import { S } from './style';
import ClothesSlider from './components/ClothesSlider';
import {
  DEFAULT_CLOTHES_BY_WEATHER,
  MAN_BOTTOM_CLOTHES,
  MAN_TOP_COLTHES,
} from '@/constants/Lookbook/data';
import { WeatherType } from '@/types/weather';

export type SliderType = 'TOP' | 'BOTTOM' | null;

type ShowcaseProps = {
  type: WeatherType;
};

const Showcase = ({ type }: ShowcaseProps) => {
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
            initial={getInitialIndex(type, 'TOP')}
            $isFocussingSlider={targetSlider === 'TOP'}
            handleSliderClick={handleSliderClick('TOP')}
          />
        </div>

        <div className='slider-wrap bottom'>
          <ClothesSlider
            items={MAN_BOTTOM_CLOTHES}
            initial={getInitialIndex(type, 'BOTTOM')}
            $isFocussingSlider={targetSlider === 'BOTTOM'}
            handleSliderClick={handleSliderClick('BOTTOM')}
          />
        </div>
      </S.ShowcaseWrap>
    </>
  );
};

export default Showcase;

function getInitialIndex(type: WeatherType, slider: Exclude<SliderType, null>) {
  const { top, bottom } = DEFAULT_CLOTHES_BY_WEATHER[type];

  const clothesList = slider === 'TOP' ? MAN_TOP_COLTHES : MAN_BOTTOM_CLOTHES;
  const clothesName = slider === 'TOP' ? top : bottom;

  return clothesList.findIndex(({ name }) => name === clothesName);
}
