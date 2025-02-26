import { TempCondition } from '@/entities/member/model/types';

import { fetchAPI } from '@/shared/lib';

import {
  RecommendClothesDto,
  WeatherForRecommendClothes,
} from '../model/types';

export async function getRecommendClothes(
  weather: WeatherForRecommendClothes,
  tempCondition: TempCondition
) {
  const requestPayload = {
    ...weather,
    tempCondition,
  };

  const params: Record<string, string> = {};
  Object.entries(requestPayload).forEach(([key, value]) => {
    params[key] = String(value);
  });

  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<RecommendClothesDto>(
    `/recommend/default?${queryString}`
  );
}
