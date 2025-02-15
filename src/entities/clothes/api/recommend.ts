import { TempCondition } from '@/entities/member/model/types';
import { WeatherForRecommendClothes } from '@/pages/Home/ClothesSection/ClothesSection';
import { fetchAPI } from '@/shared/lib';
import { RecommendClothesDto } from '../model/types';

export async function getRecommnedClothes(
  weather: WeatherForRecommendClothes & { tempCondition: TempCondition }
) {
  const params: Record<string, string> = {};
  Object.entries(weather).forEach(([key, value]) => {
    params[key] = String(value);
  });

  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<RecommendClothesDto>(
    `/recommend/default?${queryString}`
  );
}
