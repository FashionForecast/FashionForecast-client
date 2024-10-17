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
  weatherType: WeatherType;
};

const Showcase = ({ weatherType }: ShowcaseProps) => {
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
        <S.SliderWrap className='top'>
          <ClothesSlider
            items={MAN_TOP_COLTHES}
            initial={getInitialIndex(weatherType, 'TOP')}
            $isFocussingSlider={targetSlider === 'TOP'}
            handleSliderClick={handleSliderClick('TOP')}
          />
        </S.SliderWrap>

        <S.SliderWrap>
          <ClothesSlider
            items={MAN_BOTTOM_CLOTHES}
            initial={getInitialIndex(weatherType, 'BOTTOM')}
            $isFocussingSlider={targetSlider === 'BOTTOM'}
            handleSliderClick={handleSliderClick('BOTTOM')}
          />
        </S.SliderWrap>
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
