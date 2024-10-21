import { useMemo, useRef } from 'react';
import { S } from './style';
import ClothesSlider from './components/ClothesSlider';
import {
  DEFAULT_CLOTHES_BY_WEATHER,
  MAN_BOTTOM_CLOTHES,
  MAN_TOP_COLTHES,
} from '@/constants/Lookbook/data';
import { ClothesType, Outfits } from '@/types/clothes';
import { WeatherType } from '@/types/weather';
import { FocussingSliderType } from '..';
import { LocationState, LookbookSelect } from '@/pages/UserLookbookCreate';
import { useLocation } from 'react-router-dom';

export type SliderType = ClothesType | null;

type ShowcaseProps = {
  weatherType: WeatherType;
  select: LookbookSelect;
  focussingSlider: FocussingSliderType;
  updateFocussingSlider: (sliderType: FocussingSliderType) => void;
  changeClothesName: (clothesType: ClothesType) => (name: string) => void;
};

const Showcase = ({
  weatherType,
  select,
  focussingSlider,
  updateFocussingSlider,
  changeClothesName,
}: ShowcaseProps) => {
  const { state }: LocationState = useLocation();
  const showcaseRef = useRef<HTMLElement>(null);
  const topSliderInitial = useMemo(
    () => getInitialIndex(weatherType, 'top', state?.outfit),
    []
  );
  const bottomSliderInitial = useMemo(
    () => getInitialIndex(weatherType, 'bottom', state?.outfit),
    []
  );

  const detectSliderClick =
    (sliderType: SliderType) => (e: React.MouseEvent) => {
      e.stopPropagation();
      updateFocussingSlider(sliderType);
    };

  const cancleFocusingClick = () => (e: React.MouseEvent) => {
    if (showcaseRef.current && showcaseRef.current === e.target) {
      updateFocussingSlider(null);
    }
  };

  return (
    <>
      <S.ShowcaseWrap
        ref={showcaseRef}
        $isFocussing={focussingSlider}
        onClick={cancleFocusingClick()}
      >
        <S.SliderWrap
          className='top'
          $zIndex={!focussingSlider && 50}
          onClick={detectSliderClick('top')}
        >
          <ClothesSlider
            items={MAN_TOP_COLTHES}
            initial={topSliderInitial}
            clothesColor={select.top.color}
            $isFocussingSlider={focussingSlider === 'top'}
            changeClothesName={changeClothesName('top')}
          />
        </S.SliderWrap>

        <S.SliderWrap onClick={detectSliderClick('bottom')}>
          <ClothesSlider
            items={MAN_BOTTOM_CLOTHES}
            initial={bottomSliderInitial}
            clothesColor={select.bottom.color}
            $isFocussingSlider={focussingSlider === 'bottom'}
            changeClothesName={changeClothesName('bottom')}
          />
        </S.SliderWrap>
      </S.ShowcaseWrap>
    </>
  );
};

export default Showcase;

function getInitialIndex(
  type: WeatherType,
  slider: Exclude<SliderType, null>,
  userOutfit: Outfits | undefined
) {
  const { top: defaultTopName, bottom: defaultBottomName } =
    DEFAULT_CLOTHES_BY_WEATHER[type];

  const topName = userOutfit ? userOutfit.topType : defaultTopName;
  const bottomName = userOutfit ? userOutfit.bottomType : defaultBottomName;

  const clothesList = slider === 'top' ? MAN_TOP_COLTHES : MAN_BOTTOM_CLOTHES;
  const clothesName = slider === 'top' ? topName : bottomName;

  return clothesList.findIndex(({ name }) => name === clothesName);
}
