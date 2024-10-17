import { WeatherType } from '@/types/weather';
import Showcase, { SliderType } from './Showcase';
import ColorPalette from './ColorPalette';
import { useState } from 'react';
import { DEFAULT_CLOTHES_BY_WEATHER } from '@/constants/Lookbook/data';
import { ClothesType } from '@/types/clothes';

export type FocussingSliderType = SliderType | null;

type EditProps = {
  weatherType: WeatherType;
};

const Edit = ({ weatherType }: EditProps) => {
  const [select, setSelect] = useState({
    top: { name: DEFAULT_CLOTHES_BY_WEATHER[weatherType].top, color: '#fff' },
    bottom: {
      name: DEFAULT_CLOTHES_BY_WEATHER[weatherType].bottom,
      color: '#fff',
    },
  });
  const [focussingSlider, setFocussingSlider] =
    useState<FocussingSliderType>(null);

  const updateFocussingSlider = (sliderType: FocussingSliderType) =>
    setFocussingSlider(sliderType);

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
        focussingSlider={focussingSlider}
        updateFocussingSlider={updateFocussingSlider}
        changeClothesName={changeClothesName}
      />
      <ColorPalette focussingSlider={focussingSlider} />
    </>
  );
};

export default Edit;
