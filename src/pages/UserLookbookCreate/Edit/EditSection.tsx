import { WeatherType } from '@/types/weather';
import Showcase, { SliderType } from './Showcase/Showcase';
import ColorPalette from './ColorPalette/ColorPalette';
import { memo, useCallback, useState } from 'react';
import { LookbookSelect } from '../ui/Page/UserLookbookCreatePage';
import { ClothesType } from '@/types/clothes';

export type FocussingSliderType = SliderType | null;

type EditSectionProps = {
  weatherType: WeatherType;
  select: LookbookSelect;
  updateSelect: (
    select: LookbookSelect | ((prev: LookbookSelect) => LookbookSelect)
  ) => void;
};

const EditSection = ({
  weatherType,
  select,
  updateSelect,
}: EditSectionProps) => {
  const [focussingSlider, setFocussingSlider] =
    useState<FocussingSliderType>(null);

  const choicedClothesColor =
    focussingSlider === 'top' ? select.top.color : select.bottom.color;

  const updateFocussingSlider = useCallback(
    (sliderType: FocussingSliderType) => {
      setFocussingSlider(sliderType);
    },
    []
  );

  const changeClothesColor = useCallback(
    (color: string) => () => {
      if (!focussingSlider) return;

      updateSelect((prev) => ({
        ...prev,
        [focussingSlider]: { ...prev[focussingSlider], color },
      }));
    },
    [focussingSlider, updateSelect]
  );

  const changeClothesName = useCallback(
    (type: ClothesType, name: string) => {
      updateSelect((prev) => ({
        ...prev,
        [type]: { ...prev[type], name },
      }));
    },
    [updateSelect]
  );

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

export default memo(EditSection);
