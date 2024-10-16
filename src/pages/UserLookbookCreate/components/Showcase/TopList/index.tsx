import { useKeenSlider } from 'keen-slider/react';
import { MAN_TOP_COLTHES } from '@/constants/Lookbook/data';
import { useState } from 'react';
import SliderItem from '../components/SliderItem';
import SliderList from '../components/SliderList';

type TopListProps = {
  $isFocussingSlider: boolean;
  handleSliderClick: () => void;
};

const TopList = ({
  $isFocussingSlider: isFocussingSlider,
  handleSliderClick,
}: TopListProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: 'auto',
      spacing: -32,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <SliderList ref={sliderRef} handleSliderClick={handleSliderClick}>
      {MAN_TOP_COLTHES.map(({ name, Clothes }, i) => (
        <SliderItem
          key={name}
          $isFocussingSlider={isFocussingSlider}
          $isSelected={currentSlide === i}
        >
          <Clothes color={currentSlide === i ? 'white' : 'transparent'} />
        </SliderItem>
      ))}
    </SliderList>
  );
};

export default TopList;
