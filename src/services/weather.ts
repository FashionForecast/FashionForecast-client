import meteorologicalCoordinateList from '@/assets/meteorologicalRegionCoordinates';
import { SelectedTime } from '@/pages/Home/HomePage';
import { WeatherData } from '@/types/weather';
import { dateToISO, KSTDate } from '@/utils/date';
import { fetchAPI } from '@/utils/fetch';

export async function getWeatherData(
  selectedTime: SelectedTime,
  region: string
): Promise<WeatherData> {
  const nowDateTime = dateToISO(KSTDate());
  const startDateTime = convertToTime(selectedTime.day, selectedTime.start);
  const endDateTime = convertToTime(selectedTime.day, selectedTime.end);
  const { weatherNx, weatherNy } = meteorologicalCoordinateList[region];
  const params = {
    nowDateTime,
    startDateTime,
    endDateTime,
    nx: String(weatherNx),
    ny: String(weatherNy),
  };
  const queryString = new URLSearchParams(params).toString();

  return await fetchAPI(`/weather/forecast?${queryString}`);
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
