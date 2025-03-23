import { memo, useCallback, useState } from 'react';

import { ColorPalette } from '@/widgets/clothes/ui/ColorPalette/ColorPalette';

import { ClothesType, OutfitSelection } from '@/entities/clothes';
import { WeatherTypeName } from '@/entities/weather';

import {
  Showcase,
  SliderType,
} from '../../../../widgets/clothes/ui/Showcase/Showcase';

export type FocussingSliderType = SliderType | null;

type EditSectionProps = {
  weatherType: WeatherTypeName;
  selection: OutfitSelection;
  updateSelect: (selection: React.SetStateAction<OutfitSelection>) => void;
};

const EditSection = ({
  weatherType,
  selection,
  updateSelect,
}: EditSectionProps) => {
  const [focussingSlider, setFocussingSlider] =
    useState<FocussingSliderType>(null);

  const choicedClothesColor =
    focussingSlider === 'top' ? selection.top.color : selection.bottom.color;

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
        selection={selection}
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
