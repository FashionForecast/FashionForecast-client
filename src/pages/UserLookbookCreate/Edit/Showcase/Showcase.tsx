import { useMemo, useRef } from 'react';
import { S } from './Showcase.style';
import ClothesSlider from './components/ClothesSlider/ClothesSlider';
import {
  MAN_BOTTOM_CLOTHES,
  MAN_TOP_COLTHES,
  WOMAN_BOTTOM_CLOTHES,
} from '@/constants/clothesList';
import { ClothesType, MemberLookbook } from '@/types/clothes';
import { WeatherType } from '@/types/weather';
import { FocussingSliderType } from '../EditSection';
import {
  LocationState,
  LookbookSelect,
} from '@/pages/UserLookbookCreate/UserLookbookCreatePage';
import { useLocation } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';
import { Member } from '@/types/member';
import { DEFAULT_CLOTHES_BY_WEATHER } from '@/constants/lookbook';

export type SliderType = ClothesType | null;

type ShowcaseProps = {
  weatherType: WeatherType;
  select: LookbookSelect;
  focussingSlider: FocussingSliderType;
  updateFocussingSlider: (sliderType: FocussingSliderType) => void;
  changeClothesName: (type: ClothesType, name: string) => void;
};

const Showcase = ({
  weatherType,
  select,
  focussingSlider,
  updateFocussingSlider,
  changeClothesName,
}: ShowcaseProps) => {
  const user = useAppSelector((state) => state.user.info);
  const { state }: LocationState = useLocation();
  const showcaseRef = useRef<HTMLElement>(null);
  const topSliderInitial = useMemo(
    () => getInitialIndex(weatherType, 'top', state?.outfit, user?.gender),
    []
  );
  const bottomSliderInitial = useMemo(
    () => getInitialIndex(weatherType, 'bottom', state?.outfit, user?.gender),
    []
  );

  const bottomClothesList =
    user?.gender === 'FEMALE' ? WOMAN_BOTTOM_CLOTHES : MAN_BOTTOM_CLOTHES;

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
          type={'top'}
          items={MAN_TOP_COLTHES}
          initial={topSliderInitial}
          clothesColor={select.top.color}
          $isFocussingSlider={focussingSlider === 'top'}
          changeClothesName={changeClothesName}
        />
      </S.SliderWrap>

      <S.SliderWrap onClick={detectSliderClick('bottom')}>
        <ClothesSlider
          type={'bottom'}
          items={bottomClothesList}
          initial={bottomSliderInitial}
          clothesColor={select.bottom.color}
          $isFocussingSlider={focussingSlider === 'bottom'}
          changeClothesName={changeClothesName}
        />
      </S.SliderWrap>
    </S.ShowcaseWrap>
  );
};

export default Showcase;

function getInitialIndex(
  type: WeatherType,
  slider: Exclude<SliderType, null>,
  userOutfit?: MemberLookbook,
  gender?: Member['gender']
) {
  const list = {
    top: MAN_TOP_COLTHES,
    bottom: gender === 'FEMALE' ? WOMAN_BOTTOM_CLOTHES : MAN_BOTTOM_CLOTHES,
  };

  const { top: defaultTopName, bottom: defaultBottomName } =
    DEFAULT_CLOTHES_BY_WEATHER[type];

  const topName = userOutfit ? userOutfit.topType : defaultTopName;
  const bottomName = userOutfit ? userOutfit.bottomType : defaultBottomName;

  const clothesList = list[slider];
  const clothesName = slider === 'top' ? topName : bottomName;

  return clothesList.findIndex((name) => name === clothesName);
}
