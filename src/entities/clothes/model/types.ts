import { PALETTE_COLORS } from './consts';

export type LookbookItem = {
  tempStageLevel?: number;
  memberOutfitId?: number;
  topType: TopClothesName;
  topColor: PALETTE_COLORS_TYPE;
  bottomType: BottomClothesName;
  bottomColor: PALETTE_COLORS_TYPE;
};

export type LookbookCreatePageState = {
  clickedOutfit?: LookbookItem;
  referrer?: string;
} | null;

export type AllLookbookListByWeatherDto = Array<{
  memberOutfits: LookbookItem[];
  tempStageLevel: number;
}>;

export type ClothesIconNames =
  | TopClothesName
  | BottomClothesName
  | ETCClothesName;

export type TopClothesName =
  | '민소매'
  | '반팔티'
  | '반팔 폴로'
  | '반팔 셔츠'
  | '긴팔티'
  | '긴팔 폴로'
  | '긴팔 셔츠'
  | '스웨트'
  | '후드티'
  | '니트'
  | '재킷'
  | '블레이저'
  | '트렌치 코트'
  | '코트'
  | '필드 재킷'
  | '패딩';

export type BottomClothesName =
  | '반바지'
  | '치마'
  | '면바지'
  | '슬랙스'
  | '청바지'
  | '트레이닝 바지'
  | '스커트 스타킹'
  | '긴치마'
  | '기모 바지'
  | '스커트 레깅스';

type ETCClothesName =
  | '겉옷'
  | '겉옷장우산'
  | '겉옷접이식우산'
  | '목도리'
  | '목도리장우산'
  | '목도리접이식우산'
  | '히트텍'
  | '히트텍장우산'
  | '히트텍접이식우산'
  | '접이식 우산'
  | '장우산';

export type ClothesSliderType = 'top' | 'bottom';

type ClothesSelection<T extends ClothesSliderType> = T extends 'top'
  ? { name: TopClothesName; color: string }
  : { name: BottomClothesName; color: string };

export type OutfitSelection = {
  [K in ClothesSliderType]: ClothesSelection<K>;
};

export type PALETTE_COLORS_TYPE = Exclude<
  (typeof PALETTE_COLORS)[number],
  null
>;
