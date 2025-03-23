import { memo, useCallback, useState } from 'react';

import { ColorPalette } from '@/widgets/clothes/ui/ColorPalette/ColorPalette';
import { Showcase } from '@/widgets/clothes/ui/Showcase/Showcase';

import { ClothesSliderType, OutfitSelection } from '@/entities/clothes';
import { WeatherTypeName } from '@/entities/weather';

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
    useState<ClothesSliderType>('top');

  const choicedClothesColor =
    focussingSlider === 'top' ? selection.top.color : selection.bottom.color;

  const updateFocussingSlider = useCallback((sliderType: ClothesSliderType) => {
    setFocussingSlider(sliderType);
  }, []);

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
    (type: ClothesSliderType, name: string) => {
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
