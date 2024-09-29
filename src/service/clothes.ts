import {
  ClothesForWeather,
  TempCondition,
} from '@/pages/Home/components/RecommendClothes';
import { ClothesResponseData } from '@/types/clothes';

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
