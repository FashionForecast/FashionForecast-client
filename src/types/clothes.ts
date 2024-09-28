export type ClothesImageName =
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
  | '청바지'
  | '겉옷'
  | '접이식 우산'
  | '장우산'
  | '히트텍'
  | '목도리';

export type OutfitType =
  | 'OUTER'
  | 'TOP'
  | 'BOTTOM'
  | 'ETC'
  | 'BASIC_UMBRELLA'
  | 'FOLDING_UMBRELLA'
  | 'LAYERED';

export type ClothesResponse = {
  data: Array<{
    names: Array<ClothesImageName | string>;
    outfitType: OutfitType;
  }>;
  message: string;
  status: number;
};
