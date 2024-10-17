import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { S } from './style';
import 'keen-slider/keen-slider.min.css';
import { ClothesSliderItem } from '@/types/clothes';

type ClotehsSliderProps = {
  items: ClothesSliderItem[];
  initial: number;
  $isFocussingSlider: boolean;
  handleSliderClick: () => void;
};

const ClothesSlider = ({
  items,
  $isFocussingSlider,
  initial = 0,
  handleSliderClick,
}: ClotehsSliderProps) => {
  const [currentItem, setCurrentItem] = useState(initial);
  const [sliderRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      origin: 'center',
      perView: 'auto',
      spacing: -32,
    },
    initial: initial,
    slideChanged(slider) {
      setCurrentItem(slider.track.details.rel);
    },
  });

  return (
    <>
      <S.SliderList
        ref={sliderRef}
        $isFocussingSlider={$isFocussingSlider}
        className='keen-slider'
        onClick={handleSliderClick}
      >
        {items.map(({ name, Clothes }, i) => (
          <S.SliderItem
            key={name}
            className='keen-slider__slide'
            $isSelected={currentItem === i}
          >
            <Clothes color={currentItem === i ? 'white' : 'transparent'} />
          </S.SliderItem>
        ))}
      </S.SliderList>
      {$isFocussingSlider && <S.FocussingCircle />}
    </>
  );
};

export default ClothesSlider;
