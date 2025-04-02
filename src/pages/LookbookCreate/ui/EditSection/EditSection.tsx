import { useCallback, useState } from 'react';

import { ColorPalette } from '@/widgets/clothes/ui/ColorPalette/ColorPalette';
import { Showcase } from '@/widgets/clothes/ui/Showcase/Showcase';

import {
  BottomClothesName,
  ClothesSliderType,
  OutfitSelection,
  TopClothesName,
} from '@/entities/clothes';

type EditSectionProps = {
  selection: OutfitSelection;
  updateSelection: (selection: React.SetStateAction<OutfitSelection>) => void;
};

export const EditSection = ({
  selection,
  updateSelection,
}: EditSectionProps) => {
  const [focussingSlider, setFocussingSlider] =
    useState<ClothesSliderType>('top');

  const selectedSliderClothesColor =
    focussingSlider === 'top' ? selection.top.color : selection.bottom.color;

  const updateFocussingSlider = (
    sliderType: React.SetStateAction<ClothesSliderType>
  ) => {
    setFocussingSlider(sliderType);
  };

  const updateClothesColor = useCallback(
    (color: string) => () => {
      updateSelection((prev) => ({
        ...prev,
        [focussingSlider]: { ...prev[focussingSlider], color },
      }));
    },
    [focussingSlider, updateSelection]
  );

  const updateClothesName = useCallback(
    (
      sliderType: ClothesSliderType,
      clothesName: TopClothesName | BottomClothesName
    ) => {
      updateSelection((prev) => ({
        ...prev,
        [sliderType]: { ...prev[sliderType], name: clothesName },
      }));
    },
    [updateSelection]
  );

  return (
    <>
      <Showcase
        selection={selection}
        focussingSlider={focussingSlider}
        updateFocussingSlider={updateFocussingSlider}
        updateClothesName={updateClothesName}
      />

      <ColorPalette
        focussingSlider={focussingSlider}
        selectedSliderClothesColor={selectedSliderClothesColor}
        updateFocussingSlider={updateFocussingSlider}
        updateClothesColor={updateClothesColor}
      />
    </>
  );
};
