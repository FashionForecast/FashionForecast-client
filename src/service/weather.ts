import weatherCoordinateList from '@/assets/weatherRegionCoordinates';
import { SelectedTime } from '@/pages/Home';
import { WeatherResponse } from '@/types/weather';
import { dateToISO, KSTDate } from '@/utils/date';

export async function getWeather(
  selectedTime: SelectedTime,
  region: string
): Promise<WeatherResponse> {
  const nowDateTime = dateToISO(KSTDate());
  const startDateTime = selectedTime.start;
  const endDateTime = selectedTime.end;

  const { weatherNx, weatherNy } = weatherCoordinateList[region];

  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/weather/forecast?nowDateTime=${nowDateTime}&startDateTime=${startDateTime}&endDateTime=${endDateTime}&nx=${weatherNx}&ny=${weatherNy}`
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
