import {
  ClothesForWeather,
  TempCondition,
} from '@/pages/Home/components/RecommendClothes';
import { ClothesResponse } from '@/types/clothes';

export async function getDefaultClothes(
  weather: ClothesForWeather & { tempCondition: TempCondition }
): Promise<ClothesResponse> {
  try {
    const params: Record<string, string> = {};
    Object.entries(weather).forEach(([key, value]) => {
      params[key] = String(value);
    });

    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/recommend/default?${queryString}`
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json;
  } catch (error) {
    throw new Error(error as string);
  }
}
