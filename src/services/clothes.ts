import {
  WeatherForRecommendClothes,
  TempCondition,
} from '@/pages/Home/ClothesSection/ClothesSection';
import {
  RecommendClothes,
  AllLookbookListByWeather,
  MemberLookbook,
} from '@/types/clothes';
import { WeatherType } from '@/types/weather';
import { LookbookSelect } from '@/pages/UserLookbookCreate/ui/Page/UserLookbookCreatePage';
import { fetchAPI } from '@/utils/fetch';

export async function getRecommnedClothes(
  weather: WeatherForRecommendClothes & { tempCondition: TempCondition }
) {
  const params: Record<string, string> = {};
  Object.entries(weather).forEach(([key, value]) => {
    params[key] = String(value);
  });

  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<RecommendClothes>(`/recommend/default?${queryString}`);
}

export async function getAllLookbookListByWeather(
  accessToken: string | null
): Promise<AllLookbookListByWeather> {
  return fetchAPI<AllLookbookListByWeather>('/member/outfits', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function saveLookbook(
  weatherType: WeatherType,
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

type LookbookItemData = {
  topType: string;
  topColor: string;
  bottomType: string;
  bottomColor: string;
  tempStageLevel: number;
};

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

export async function getMemberLookbook(
  temperature: WeatherForRecommendClothes['extremumTmp'],
  tempCondition: TempCondition,
  accessToken: string | null
) {
  const params = { extremumTmp: String(temperature), tempCondition };
  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI<MemberLookbook[]>(
    `/member/outfits/temp-stage?${queryString}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}
