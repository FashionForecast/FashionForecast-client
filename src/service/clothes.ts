import {
  ClothesForWeather,
  TempCondition,
} from '@/pages/Home/components/RecommendClothes';
import { ClothesResponseData, LookbookListResponseData } from '@/types/clothes';
import { WeatherType } from '@/types/weather';
import { LookbookSelect } from '@/pages/UserLookbookCreate';

export async function getDefaultClothes(
  weather: ClothesForWeather & { tempCondition: TempCondition }
): Promise<ClothesResponseData> {
  try {
    const params: Record<string, string> = {};
    Object.entries(weather).forEach(([key, value]) => {
      params[key] = String(value);
    });

    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/recommend/default?${queryString}`
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getLookbookList(
  accessToken: string | null
): Promise<LookbookListResponseData> {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/outfits`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function saveLookbook(
  weatherType: WeatherType,
  select: LookbookSelect,
  token: string | null
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

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/outfit`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
