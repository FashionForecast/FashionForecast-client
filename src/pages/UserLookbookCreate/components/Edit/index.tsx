import { WeatherType } from '@/types/weather';
import Showcase, { SliderType } from './Showcase';
import ColorPalette from './ColorPalette';
import { useCallback, useState } from 'react';
import { DEFAULT_CLOTHES_BY_WEATHER } from '@/constants/Lookbook/data';
import { ClothesType } from '@/types/clothes';

export type FocussingSliderType = SliderType | null;
export type LookbookSelect = {
  top: { name: string; color: string };
  bottom: {
    name: string;
    color: string;
  };
};

type EditProps = {
  weatherType: WeatherType;
};

const Edit = ({ weatherType }: EditProps) => {
  const [select, setSelect] = useState<LookbookSelect>({
    top: {
      name: DEFAULT_CLOTHES_BY_WEATHER[weatherType].top,
      color: '#F9FAFB',
    },
    bottom: {
      name: DEFAULT_CLOTHES_BY_WEATHER[weatherType].bottom,
      color: '#F9FAFB',
    },
  });
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

      setSelect((prev) => ({
        ...prev,
        [focussingSlider]: { ...prev[focussingSlider], color },
      }));
    },
    [focussingSlider]
  );

  const changeClothesName = (clothesType: ClothesType) => (name: string) => {
    setSelect((prev) => ({
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
