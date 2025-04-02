import { BottomClothesName, TopClothesName } from '../../model/types';
import { ClothesIcon } from '../ClothesIcon/ClothesIcon';

import { S } from './LookbookClothes.style';

type LookbookClothesProps = {
  topName: TopClothesName | null;
  topColor: string;
  bottomName: BottomClothesName | null;
  bottomColor: string;
};

export const LookbookClothes = ({
  topName,
  topColor,
  bottomName,
  bottomColor,
}: LookbookClothesProps) => {
  const top = TOP_POSITION_MAP.get(topName) ?? 0;

  return (
    <S.ClothesWrap $top={top}>
      <S.TopClothes $top={top}>
        <ClothesIcon name={topName} color={topColor} />
      </S.TopClothes>

      <ClothesIcon name={bottomName} color={bottomColor} />
    </S.ClothesWrap>
  );
};

const TOP_POSITION_MAP = new Map<TopClothesName | null, number>([
  ['민소매', 10],
  ['반팔티', 12],
  ['반팔 폴로티', 10],
  ['반팔 셔츠', 10],
  ['긴팔티', 12],
  ['긴팔 폴로티', 12],
  ['긴팔 셔츠', 10],
  ['맨투맨', 12],
  ['후드티', 12],
  ['니트', 12],
  ['재킷', 11],
  ['블레이저', 11],
  ['트렌치 코트', 23],
  ['코트', 23],
  ['야전상의', 23],
  ['패딩', 12],
]);
