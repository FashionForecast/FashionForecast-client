import { TemperatureCondition } from '@/entities/weather';

import { fetchAPI } from '@/shared/lib';

import {
  RecommendClothesDto,
  WeatherForRecommendClothes,
} from '../model/types';

export async function getRecommendClothes(
  weather: WeatherForRecommendClothes,
  temperatureCondition: TemperatureCondition
) {
  const requestPayload = {
    ...weather,
    tempCondition: temperatureCondition,
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
