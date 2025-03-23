import { useKeenSlider } from 'keen-slider/react';
import { memo, useState } from 'react';

import { ClothesIconNames, ClothesType } from '@/entities/clothes';
import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';

import { S, C } from './ClothesSlider.style';

type ClothesSliderProps = {
  type: 'top' | 'bottom';
  items: ClothesIconNames[];
  initial: number;
  clothesColor: string;
  $isFocussingSlider: boolean;
  changeClothesName: (type: ClothesType, name: string) => void;
};

export const ClothesSlider = memo(
  ({
    type,
    items,
    clothesColor,
    $isFocussingSlider,
    initial = 0,
    changeClothesName,
  }: ClothesSliderProps) => {
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
          $zIndex={type === 'top' && 100}
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
              {currentItem === i && <C.NameChip color='black' label={name} />}
            </S.SliderItem>
          ))}
        </S.SliderList>
        {$isFocussingSlider && <S.FocussingCircle />}
      </>
    );
  }
);
