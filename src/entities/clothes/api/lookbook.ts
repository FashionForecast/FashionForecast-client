import { LookbookSelect } from '@/pages/UserLookbookCreate/ui/Page/UserLookbookCreatePage';

import { WeatherTypeNumber } from '@/entities/weather';

import { fetchAPI } from '@/shared/lib';

import { AllLookbookListByWeatherDto, LookbookItemData } from '../model/types';

export async function getAllLookbookListByWeather(
  accessToken: string | null
): Promise<AllLookbookListByWeatherDto> {
  return fetchAPI<AllLookbookListByWeatherDto>('/member/outfits', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function saveLookbook(
  weatherType: WeatherTypeNumber,
  select: LookbookSelect,
  token: string | null,
  outfitId?: number
) {
  try {
    const { top, bottom } = select;
    const data = {
      topType: top.name,
      topColor: top.color,
      bottomType: bottom.name,
      bottomColor: bottom.color,
      tempStageLevel: Number(weatherType),
    };

    const handler = outfitId ? updateLookbookItem : createLookbookItem;
    await handler(data, token, outfitId);
  } catch (error) {
    throw new Error(error as string);
  }
}

async function createLookbookItem(
  data: LookbookItemData,
  token: string | null
) {
  await fetchAPI('/member/outfit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function updateLookbookItem(
  data: LookbookItemData,
  token: string | null,
  outfitId?: number
) {
  await fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteLookbookItem(
  outfitId: number | undefined,
  accessToken: string | null
) {
  if (!outfitId) throw new Error(`해당 룩북을 찾을 수 없습니다.`);

  fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
