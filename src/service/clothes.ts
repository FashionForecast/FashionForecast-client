import { ClothesForWeather } from '@/pages/Home/components/RecommendClothes';
import { ClothesResponse } from '@/types/clothes';

export async function getDefaultClothes(
  weather: ClothesForWeather
): Promise<ClothesResponse> {
  try {
    const params: Record<string, string> = {};
    Object.entries(weather).forEach(([key, value]) => {
      params[key] = String(value);
    });
    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
        //Todo: StartDateTime과 EndDateTime Timeselector로 받아오기
      }/recommend/default?${queryString}&tempCondition=NORMAL`
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
