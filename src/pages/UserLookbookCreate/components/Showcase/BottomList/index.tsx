import { useKeenSlider } from 'keen-slider/react';
import { MAN_BOTTOM_CLOTHES } from '@/constants/Lookbook/data';
import { useState } from 'react';
import SliderItem from '../components/SliderItem';
import SliderList from '../components/SliderList';

const BottomList = () => {
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
    <SliderList ref={sliderRef}>
      {MAN_BOTTOM_CLOTHES.map(({ name, Clothes }, i) => (
        <SliderItem key={name} $isSelected={currentSlide === i}>
          <Clothes color='white' />
        </SliderItem>
      ))}
    </SliderList>
  );
};

export default BottomList;
