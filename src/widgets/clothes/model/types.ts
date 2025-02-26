import { WeatherDto } from '@/entities/weather';

import { ClothesNames, OutfitType } from '@/shared/types';

export type RecommendClothesDto = Array<{
  names: Array<ClothesNames | string>;
  outfitType: OutfitType;
}>;

export type WeatherForRecommendClothes = Pick<
  WeatherDto,
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPop' | 'maximumPcp'
>;
