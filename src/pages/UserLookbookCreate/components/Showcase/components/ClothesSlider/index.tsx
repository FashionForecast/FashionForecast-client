import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { S } from './style';
import 'keen-slider/keen-slider.min.css';
import { ClothesSliderItem } from '@/types/clothes';

type ClotehsSliderProps = {
  items: ClothesSliderItem[];
  $isFocussingSlider: boolean;
  handleSliderClick: () => void;
};

const ClothesSlider = ({
  items,
  $isFocussingSlider,
  handleSliderClick,
}: ClotehsSliderProps) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: 'auto',
      spacing: -32,
    },
    slideChanged(slider) {
      setCurrentItem(slider.track.details.rel);
    },
  });

  return (
    <S.SliderList
      ref={sliderRef}
      className='keen-slider'
      onClick={handleSliderClick}
    >
      {items.map(({ name, Clothes }, i) => (
        <S.SliderItem
          key={name}
          className='keen-slider__slide'
          $isFocussingSlider={$isFocussingSlider}
          $isSelected={currentItem === i}
        >
          <Clothes color={currentItem === i ? 'white' : 'transparent'} />
        </S.SliderItem>
      ))}
    </S.SliderList>
  );
};

export default ClothesSlider;
