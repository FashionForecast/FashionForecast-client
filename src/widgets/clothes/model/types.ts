import { ClothesIconNames } from '@/entities/clothes';
import { WeatherDto } from '@/entities/weather';

export type OutfitType = 'TOP' | 'BOTTOM' | 'ETC';

export type RecommendClothesDto = Array<{
  names: Array<ClothesIconNames>;
  outfitType: OutfitType;
}>;

export type WeatherForRecommendClothes = Pick<
  WeatherDto,
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPop' | 'maximumPcp'
>;

export type MemberLookbookDto = {
  memberOutfitId: number;
  topType: ClothesIconNames;
  topColor: string;
  bottomType: ClothesIconNames;
  bottomColor: string;
};
