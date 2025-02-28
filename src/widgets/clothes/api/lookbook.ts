import { TemperatureCondition } from '@/entities/weather';

import { fetchAPI } from '@/shared/lib';

import { MemberLookbookDto } from '../model/types';

export async function getMemberLookbook(
  extremumTemperature: number,
  temperatureCondition: TemperatureCondition,
  accessToken: string | null
) {
  const params = {
    extremumTmp: String(extremumTemperature),
    tempCondition: temperatureCondition,
  };
  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<MemberLookbookDto[]>(
    `/member/outfits/temp-stage?${queryString}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}
