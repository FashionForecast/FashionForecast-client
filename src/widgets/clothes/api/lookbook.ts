import { LookbookItem } from '@/entities/clothes';
import { TemperatureCondition } from '@/entities/weather';

import { GUEST_UUID } from '@/shared/consts';
import { fetchAPI } from '@/shared/lib';

export async function getMemberLookbook({
  extremumTemperature,
  temperatureCondition,
  accessToken,
}: {
  extremumTemperature: number;
  temperatureCondition: TemperatureCondition;
  accessToken: string | null;
}) {
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

export async function getGuestLookbook(
  extremumTemperature: number,
  temperatureCondition: TemperatureCondition
) {
  const guestUUID = localStorage.getItem(GUEST_UUID);
  const params = {
    uuid: String(guestUUID),
    extremumTmp: String(extremumTemperature),
    tempCondition: temperatureCondition,
  };
  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<LookbookItem>(`/guest/outfit/temp-stage?${queryString}`) //
    .then((lookbookItem) => {
      if (lookbookItem === null) return [];
      return [lookbookItem];
    });
}
