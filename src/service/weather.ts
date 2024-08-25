import meteorologicalCoordinateList from '@/assets/meteorologicalRegionCoordinates';
import { SelectedTime } from '@/pages/Home';
import { WeatherResponseData } from '@/types/weather';
import { dateToISO, KSTDate } from '@/utils/date';

export async function getWeather(
  selectedTime: SelectedTime,
  region: string
): Promise<WeatherResponseData> {
  const nowDateTime = dateToISO(KSTDate());
  const startDateTime = convertToTime(selectedTime.day, selectedTime.start);
  const endDateTime = convertToTime(selectedTime.day, selectedTime.end);

  const { weatherNx, weatherNy } = meteorologicalCoordinateList[region];

  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/weather/forecast?nowDateTime=${nowDateTime}&startDateTime=${startDateTime}&endDateTime=${endDateTime}&nx=${weatherNx}&ny=${weatherNy}`
    );
    const json = await res.json();
    console.log(json);

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

function convertToTime(day: SelectedTime['day'], time: string) {
  const date = KSTDate();
  let hour = parseInt(time.slice(3, 5), 10);

  if (time.includes('오후') && hour < 12) {
    hour = hour + 12;
  }

  if (day === '내일') {
    date.setDate(date.getDate() + 1);
  }

  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);

  return dateToISO(date);
}
