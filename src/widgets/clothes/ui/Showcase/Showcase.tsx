import { useMemo } from 'react';

import {
  BottomClothesName,
  ClothesSlider,
  ClothesSliderType,
  OutfitSelection,
  TopClothesName,
} from '@/entities/clothes';
import { Gender } from '@/entities/member/model/types';

import { useAppSelector } from '@/shared/lib/useAppSelector';

import {
  MAN_BOTTOM_CLOTHES,
  MAN_TOP_CLOTHES,
  WOMAN_BOTTOM_CLOTHES,
} from '../../model/consts';

import { S } from './Showcase.style';

type ShowcaseProps = {
  selection: OutfitSelection;
  focussingSlider: ClothesSliderType;
  updateFocussingSlider: (
    sliderType: React.SetStateAction<ClothesSliderType>
  ) => void;
  updateClothesName: (
    sliderType: ClothesSliderType,
    clothesName: TopClothesName | BottomClothesName
  ) => void;
};

export const Showcase = ({
  selection,
  focussingSlider,
  updateFocussingSlider,
  updateClothesName,
}: ShowcaseProps) => {
  const member = useAppSelector((state) => state.member.info);
  const clothesLists = getClothesList(member?.gender);
  const { topClothesList, bottomClothesList } = clothesLists;

  const { topInitialIndex, bottomInitialIndex } = useMemo(
    () => getInitialSliderIndex(selection, clothesLists),
    []
  );

  return (
    <S.ShowcaseWrap>
      <S.SliderWrap onClick={() => updateFocussingSlider('top')}>
        <ClothesSlider
          sliderType='top'
          focussingSliderType={focussingSlider}
          clothesList={topClothesList}
          initialIndex={topInitialIndex}
          clothesColor={selection.top.color}
          updateClothesName={updateClothesName}
        />
      </S.SliderWrap>

      <S.SliderWrap onClick={() => updateFocussingSlider('bottom')}>
        <ClothesSlider
          sliderType='bottom'
          focussingSliderType={focussingSlider}
          clothesList={bottomClothesList}
          initialIndex={bottomInitialIndex}
          clothesColor={selection.bottom.color}
          updateClothesName={updateClothesName}
        />
      </S.SliderWrap>
    </S.ShowcaseWrap>
  );
};

function getInitialSliderIndex(
  selection: OutfitSelection,
  clothesLists: ClothesLists
) {
  const { topClothesList, bottomClothesList } = clothesLists;

  const topIndex = topClothesList.findIndex(
    (name) => name === selection.top.name
  );
  const bottomIndex = bottomClothesList.findIndex(
    (name) => name === selection.bottom.name
  );

  const topInitialIndex = topIndex === -1 ? 0 : topIndex;
  const bottomInitialIndex = bottomIndex === -1 ? 0 : bottomIndex;

  return {
    topInitialIndex,
    bottomInitialIndex,
  };
}

type ClothesLists = {
  topClothesList: TopClothesName[];
  bottomClothesList: BottomClothesName[];
};

/**
 * 남성 또는 비회원은 남성 상하의 옷 리스트 반환
 * 여성은 남성 상의, 여성 하의 옷 리스트 반환
 * */
function getClothesList(gender?: Gender | null): ClothesLists {
  const topClothesList = MAN_TOP_CLOTHES;
  const bottomClothesList =
    gender === 'FEMALE' ? WOMAN_BOTTOM_CLOTHES : MAN_BOTTOM_CLOTHES;

  return {
    topClothesList,
    bottomClothesList,
  };
}
