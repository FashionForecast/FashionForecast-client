import { WeatherType } from '@/types/weather';
import Showcase, { SliderType } from './Showcase';
import ColorPalette from './ColorPalette';
import { useCallback, useState } from 'react';
import { ClothesType } from '@/types/clothes';
import { LookbookSelect } from '../..';

export type FocussingSliderType = SliderType | null;

type EditProps = {
  weatherType: WeatherType;
  select: LookbookSelect;
  updateSelect: (
    select: LookbookSelect | ((prev: LookbookSelect) => LookbookSelect)
  ) => void;
};

const Edit = ({ weatherType, select, updateSelect }: EditProps) => {
  const [focussingSlider, setFocussingSlider] =
    useState<FocussingSliderType>(null);

  const choicedClothesColor =
    focussingSlider === 'top' ? select.top.color : select.bottom.color;

  const updateFocussingSlider = (sliderType: FocussingSliderType) => {
    setFocussingSlider(sliderType);
  };

  const changeClothesColor = useCallback(
    (color: string) => () => {
      if (!focussingSlider) return;

      updateSelect((prev) => ({
        ...prev,
        [focussingSlider]: { ...prev[focussingSlider], color },
      }));
    },
    [focussingSlider]
  );

  const changeClothesName = (clothesType: ClothesType) => (name: string) => {
    updateSelect((prev) => ({
      ...prev,
      [clothesType]: { ...prev[clothesType], name },
    }));
  };

  return (
    <>
      <Showcase
        weatherType={weatherType}
        select={select}
        focussingSlider={focussingSlider}
        updateFocussingSlider={updateFocussingSlider}
        changeClothesName={changeClothesName}
      />
      <ColorPalette
        focussingSlider={focussingSlider}
        clothesColor={choicedClothesColor}
        changeClothesColor={changeClothesColor}
      />
    </>
  );
};

export default Edit;
