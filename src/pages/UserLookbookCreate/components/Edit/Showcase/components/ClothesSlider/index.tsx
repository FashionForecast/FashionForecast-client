import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import { S } from './style';
import 'keen-slider/keen-slider.min.css';
import { ClothesSliderItem } from '@/types/clothes';

type ClotehsSliderProps = {
  items: ClothesSliderItem[];
  initial: number;
  clothesColor: string;
  $isFocussingSlider: boolean;
  changeClothesName: (name: string) => void;
};

const ClothesSlider = ({
  items,
  clothesColor,
  $isFocussingSlider,
  initial = 0,
  changeClothesName,
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
      const index = slider.track.details.rel;

      setCurrentItem(index);
      changeClothesName(items[index].name);
    },
  });

  return (
    <>
      <S.SliderList
        ref={sliderRef}
        $isFocussingSlider={$isFocussingSlider}
        className='keen-slider'
      >
        {items.map(({ name, Clothes }, i) => (
          <S.SliderItem
            key={name}
            className='keen-slider__slide'
            $isSelected={currentItem === i}
          >
            <Clothes color={currentItem === i ? clothesColor : 'transparent'} />
          </S.SliderItem>
        ))}
      </S.SliderList>
      {$isFocussingSlider && <S.FocussingCircle />}
    </>
  );
};

export default ClothesSlider;
