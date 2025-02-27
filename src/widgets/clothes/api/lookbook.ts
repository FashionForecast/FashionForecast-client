import { TemperatureCondition } from '@/entities/weather';

import { fetchAPI } from '@/shared/lib';

import { MemberLookbookDto, WeatherForRecommendClothes } from '../model/types';

export async function getMemberLookbook(
  temperature: WeatherForRecommendClothes['extremumTmp'],
  temperatureCondition: TemperatureCondition,
  accessToken: string | null
) {
  const params = {
    extremumTmp: String(temperature),
    tempCondition: temperatureCondition,
  };
  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<MemberLookbookDto[]>(
    `/member/outfits/temp-stage?${queryString}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}
