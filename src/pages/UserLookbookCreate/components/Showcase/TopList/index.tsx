import { useKeenSlider } from 'keen-slider/react';
import { MAN_TOP_COLTHES } from '@/constants/Lookbook/data';
import { useState } from 'react';
import { S } from './style';
import 'keen-slider/keen-slider.min.css';

const TopList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: 'auto',
      spacing: -48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <S.SliderList ref={sliderRef} className='keen-slider'>
      {MAN_TOP_COLTHES.map(({ name, Clothes }, i) => (
        <S.ClothesItem
          key={name}
          className='keen-slider__slide'
          $isSelected={currentSlide === i}
        >
          <Clothes color='white' />
        </S.ClothesItem>
      ))}
    </S.SliderList>
  );
};

export default TopList;
