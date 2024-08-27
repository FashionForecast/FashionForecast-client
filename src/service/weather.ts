import weatherCoordinateList from '@/assets/weatherRegionCoordinates';
import { WeatherResponse } from '@/types/weather';

export async function getWeather(
  region?: string
): Promise<WeatherResponse | null> {
  if (!region) return null;

  const offset = 1000 * 60 * 60 * 9;
  const KTCnow = new Date(new Date().getTime() + offset);
  const endDateTime = new Date(
    new Date().setHours(23, 0, 0, 0) + offset
  ).toISOString();
  const now = KTCnow.toISOString().slice(0, -5);
  const { weatherNx, weatherNy } = weatherCoordinateList[region];

  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
        //Todo: StartDateTime과 EndDateTime Timeselector로 받아오기
      }/weather/forecast?nowDateTime=${now}&startDateTime=${now}&endDateTime=${endDateTime}&nx=${weatherNx}&ny=${weatherNy}`
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
