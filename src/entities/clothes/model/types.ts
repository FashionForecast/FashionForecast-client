import { ClothesNames, OutfitType } from '@/shared/types';

export type RecommendClothesDto = Array<{
  names: Array<ClothesNames | string>;
  outfitType: OutfitType;
}>;

export type LookbookItemData = {
  topType: string;
  topColor: string;
  bottomType: string;
  bottomColor: string;
  tempStageLevel: number;
};

export type MemberLookbookDto = {
  memberOutfitId: number;
  topType: ClothesNames;
  topColor: string;
  bottomType: ClothesNames;
  bottomColor: string;
};

export type AllLookbookListByWeatherDto = Array<{
  memberOutfits: MemberLookbookDto[];
  tempStageLevel: number;
}>;
