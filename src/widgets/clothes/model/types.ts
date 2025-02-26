import { ClothesNames, OutfitType } from '@/shared/types';

export type RecommendClothesDto = Array<{
  names: Array<ClothesNames | string>;
  outfitType: OutfitType;
}>;
