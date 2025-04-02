import { TemperatureCondition } from '@/entities/weather';

import { getGuestLookbook, getMemberLookbook } from '../api/lookbook';

export async function getLookbook({
  extremumTemperature,
  temperatureCondition,
  accessToken,
}: {
  extremumTemperature: number;
  temperatureCondition: TemperatureCondition;
  accessToken: string | null;
}) {
  if (accessToken) {
    return await getMemberLookbook({
      extremumTemperature,
      temperatureCondition,
      accessToken,
    });
  }

  return await getGuestLookbook(extremumTemperature, temperatureCondition);
}
