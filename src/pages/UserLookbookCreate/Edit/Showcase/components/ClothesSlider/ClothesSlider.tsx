import { useKeenSlider } from 'keen-slider/react';
import { memo, useState } from 'react';
import { S } from './ClothesSlider.style';
import { ClothesIconNames, ClothesType } from '@/types/clothes';
import { ClothesIcon } from '@/shared/ui';

type ClotehsSliderProps = {
  type: 'top' | 'bottom';
  items: ClothesIconNames[];
  initial: number;
  clothesColor: string;
  $isFocussingSlider: boolean;
  changeClothesName: (type: ClothesType, name: string) => void;
};

const ClothesSlider = ({
  type,
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
      changeClothesName(type, items[index]);
    },
  });

  return (
    <>
      <S.SliderList
        ref={sliderRef}
        $isFocussingSlider={$isFocussingSlider}
        className='keen-slider'
      >
        {items.map((name, i) => (
          <S.SliderItem
            key={name}
            className='keen-slider__slide'
            $isSelected={currentItem === i}
          >
            <ClothesIcon
              name={name}
              color={currentItem === i ? clothesColor : 'transparent'}
            />
          </S.SliderItem>
        ))}
      </S.SliderList>
      {$isFocussingSlider && <S.FocussingCircle />}
    </>
  );
};

export default memo(ClothesSlider);
