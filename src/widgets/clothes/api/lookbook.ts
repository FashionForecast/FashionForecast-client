import { LookbookItem } from '@/entities/clothes';
import { TemperatureCondition } from '@/entities/weather';

import { fetchAPI } from '@/shared/lib';

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

  return await fetchAPI<LookbookItem[]>(
    `/member/outfits/temp-stage?${queryString}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}
