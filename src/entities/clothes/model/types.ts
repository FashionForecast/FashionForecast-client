import { ClothesNames } from '@/shared/types';

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
