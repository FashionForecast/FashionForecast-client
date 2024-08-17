import { WeatherResponse } from '@/types/weather';

export async function getWeather(): Promise<WeatherResponse> {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/weather/forecast?now=2024-08-17T15:00:00&nx=60&ny=127`
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
