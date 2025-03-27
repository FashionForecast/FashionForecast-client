import { fetchAPI } from '@/shared/lib';

import { AllLookbookListByWeatherDto } from '../model/types';

export async function getAllLookbookListByWeather(
  accessToken: string | null
): Promise<AllLookbookListByWeatherDto> {
  return fetchAPI<AllLookbookListByWeatherDto>('/member/outfits', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
