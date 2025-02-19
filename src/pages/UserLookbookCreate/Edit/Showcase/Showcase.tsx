import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import {
  LocationState,
  LookbookSelect,
} from '@/pages/UserLookbookCreate/ui/Page/UserLookbookCreatePage';

import { MemberLookbookDto } from '@/entities/clothes/model/types';
import { MemberDto } from '@/entities/member/model/types';

import {
  MAN_BOTTOM_CLOTHES,
  MAN_TOP_COLTHES,
  WOMAN_BOTTOM_CLOTHES,
} from '@/shared/consts';
import { DEFAULT_CLOTHES_BY_WEATHER } from '@/shared/consts/lookbook';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { ClothesType, WeatherType } from '@/shared/types';

import { FocussingSliderType } from '../EditSection';

import ClothesSlider from './components/ClothesSlider/ClothesSlider';
import { S } from './Showcase.style';

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
  const user = useAppSelector((state) => state.member.info);
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
  userOutfit?: MemberLookbookDto,
  gender?: MemberDto['gender']
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
