import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { REPRESENTATIVE_CLOTHES_BY_WEATHER } from '@/pages/UserLookbookCreate/model/consts';
import { LookbookSelect } from '@/pages/UserLookbookCreate/ui/UserLookbookCreatePage';

import {
  ClothesType,
  LookbookCreatePageState,
  LookbookItem,
} from '@/entities/clothes';
import { MemberDto } from '@/entities/member/model/types';
import { WeatherTypeName } from '@/entities/weather';

import {
  MAN_BOTTOM_CLOTHES,
  MAN_TOP_COLTHES,
  WOMAN_BOTTOM_CLOTHES,
} from '@/shared/consts';
import { useAppSelector } from '@/shared/lib/useAppSelector';

import { FocussingSliderType } from '../EditSection';

import ClothesSlider from './components/ClothesSlider/ClothesSlider';
import { S } from './Showcase.style';

export type SliderType = ClothesType | null;

type ShowcaseProps = {
  weatherType: WeatherTypeName;
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
  const pageState: LookbookCreatePageState = useLocation().state;
  const showcaseRef = useRef<HTMLElement>(null);
  const topSliderInitial = useMemo(
    () =>
      getInitialIndex(
        weatherType,
        'top',
        pageState?.clickedOutfit,
        user?.gender
      ),
    []
  );
  const bottomSliderInitial = useMemo(
    () =>
      getInitialIndex(
        weatherType,
        'bottom',
        pageState?.clickedOutfit,
        user?.gender
      ),
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
  weatherType: WeatherTypeName,
  slider: Exclude<SliderType, null>,
  userOutfit?: LookbookItem,
  gender?: MemberDto['gender']
) {
  const list = {
    top: MAN_TOP_COLTHES,
    bottom: gender === 'FEMALE' ? WOMAN_BOTTOM_CLOTHES : MAN_BOTTOM_CLOTHES,
  };

  const { top: defaultTop, bottom: defaultBottom } =
    REPRESENTATIVE_CLOTHES_BY_WEATHER[weatherType];

  const topName = userOutfit ? userOutfit.topType : defaultTop;
  const bottomName = userOutfit ? userOutfit.bottomType : defaultBottom;

  const clothesList = list[slider];
  const clothesName = slider === 'top' ? topName : bottomName;

  return clothesList.findIndex((name) => name === clothesName);
}
