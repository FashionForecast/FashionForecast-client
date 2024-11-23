export type ClothesProps = {
  color?: string;
};

export type ClothesNames =
  | '민소매'
  | '반팔티'
  | '긴팔티'
  | '후드티'
  | '니트'
  | '트렌치 코트'
  | '코트'
  | '패딩'
  | '반바지'
  | '슬랙스'
  | '면바지'
  | '기모 바지'
  | '치마'
  | '긴치마'
  | '청바지'
  | '겉옷'
  | '접이식 우산'
  | '장우산'
  | '히트텍'
  | '목도리';

export type ClothesIconNames =
  | ClothesNames
  | '바지'
  | '겉옷장우산'
  | '겉옷접이식우산';

export type OutfitType = 'TOP' | 'BOTTOM' | 'ETC';

export type ClothesResponseData = Array<{
  names: Array<ClothesNames | string>;
  outfitType: OutfitType;
}>;

export type ClothesType = 'top' | 'bottom';

export type Outfits = {
  memberOutfitId: number;
  topType: ClothesNames;
  topColor: string;
  bottomType: ClothesNames;
  bottomColor: string;
};

export type LookbookListResponseData = Array<{
  memberOutfits: Outfits[];
  tempStageLevel: number;
}>;
