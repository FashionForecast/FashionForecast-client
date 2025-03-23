import { useKeenSlider } from 'keen-slider/react';
import { memo, useState } from 'react';

import {
  BottomClothesName,
  ClothesSliderType,
  TopClothesName,
} from '@/entities/clothes';
import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';

import { S, C } from './ClothesSlider.style';

type ClothesSliderProps = {
  sliderType: ClothesSliderType;
  focussingSliderType: ClothesSliderType;
  clothesList: TopClothesName[] | BottomClothesName[];
  initialIndex: number;
  clothesColor: string;
  updateClothesName: (
    sliderType: ClothesSliderType,
    clothesName: TopClothesName | BottomClothesName
  ) => void;
};

export const ClothesSlider = memo(
  ({
    sliderType,
    focussingSliderType,
    clothesList,
    clothesColor,
    initialIndex,
    updateClothesName,
  }: ClothesSliderProps) => {
    const [focussingClothes, setFocussingClothes] = useState(
      clothesList[initialIndex]
    );

    const [sliderRef] = useKeenSlider({
      mode: 'snap',
      slides: {
        origin: 'center',
        perView: 'auto',
        spacing: -32,
      },
      initial: initialIndex,
      slideChanged(slider) {
        const focussingIndex = slider.track.details.rel;
        const clothesName = clothesList[focussingIndex];

        setFocussingClothes(clothesName);
        updateClothesName(sliderType, clothesName);
      },
    });

    return (
      <>
        <S.SliderList
          className='keen-slider'
          ref={sliderRef}
          $zIndex={sliderType === 'top' && 100}
        >
          {clothesList.map((name) => (
            <S.SliderItem
              key={name}
              className='keen-slider__slide'
              $isSelected={focussingClothes === name}
            >
              <ClothesIcon
                name={name}
                color={focussingClothes === name ? clothesColor : 'transparent'}
              />
              {focussingClothes === name && (
                <C.NameChip color='black' label={name} />
              )}
            </S.SliderItem>
          ))}
        </S.SliderList>

        {focussingSliderType === sliderType && <S.FocussingCircle />}
      </>
    );
  }
);
