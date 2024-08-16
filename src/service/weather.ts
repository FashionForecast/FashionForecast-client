import { WeatherResponse } from '@/types/weather';

export async function getWeather(): Promise<WeatherResponse> {
  const res = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL
    }/weather/forecast?now=2024-08-15T15:00:00&nx=60&ny=127`
  );
  const data = await res.json();

  return data;
}
