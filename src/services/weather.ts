import { regionCoordinateList } from '@/shared/consts';
import { DayButtonType, Time } from '@/widgets/TimeSelector';
import { WeatherData } from '@/types/weather';
import { dateToISO, KSTDate } from '@/utils/date';
import { fetchAPI } from '@/utils/fetch';

export async function getWeather(
  times: Time[],
  day: DayButtonType,
  region: string
): Promise<WeatherData> {
  const nowDateTime = dateToISO(KSTDate());
  const minStartDateTime = convertToTime(times[0].indexes[0], day);
  const maxEndDateTime = convertToTime(
    times.at(-1)?.indexes.at(-1),
    day,
    times[times.length - 1].isTomorrow
  );

  const { nx, ny } = regionCoordinateList[region];

  const params = new URLSearchParams({
    nowDateTime,
    minStartDateTime,
    maxEndDateTime,
    nx: String(nx),
    ny: String(ny),
  });

  times.forEach(({ indexes, isTomorrow }) => {
    const tomorrowIndex = isTomorrow ? indexes.findIndex((i) => i === 0) : null;
    indexes.forEach((time, i) => {
      const timeString = convertToTime(
        time,
        day,
        tomorrowIndex !== null && i >= tomorrowIndex && isTomorrow
      );
      params.append('selectedTimes', timeString);
    });
  });

  const queryString = params.toString();

  return await fetchAPI(`/weather/forecast/group?${queryString}`);
}

// export async function getWeatherData(
//   selectedTime: SelectedTime,
//   region: string
// ): Promise<WeatherData> {
//   const nowDateTime = dateToISO(KSTDate());
//   const startDateTime = convertToTime(selectedTime.day, selectedTime.start);
//   const endDateTime = convertToTime(selectedTime.day, selectedTime.end);
//   const { nx, ny } = regionCoordinateList[region];
//   const params = {
//     nowDateTime,
//     startDateTime,
//     endDateTime,
//     nx: String(nx),
//     ny: String(ny),
//   };
//   const queryString = new URLSearchParams(params).toString();

//   return await fetchAPI(`/weather/forecast?${queryString}`);
// }

// function convertToTime(day: SelectedTime['day'], time: string) {
//   const date = KSTDate();
//   let hour = parseInt(time.slice(3, 5), 10);

//   if (time.includes('오후') && hour < 12) {
//     hour = hour + 12;
//   }

//   if (day === '내일') {
//     date.setDate(date.getDate() + 1);
//   }

//   date.setHours(hour);
//   date.setMinutes(0);
//   date.setSeconds(0);

//   return dateToISO(date);
// }

function convertToTime(
  time: number | undefined,
  day: DayButtonType,
  isTomorrow?: boolean
) {
  if (time === undefined) {
    throw Error('time이 존재하지 않습니다.');
  }

  const date = KSTDate();
  // let hour = parseInt(time.slice(3, 5), 10);

  // if (time.includes('오후') && hour < 12) {
  //   hour = hour + 12;
  // }

  let addToDay = 0;
  if (day === '내일') {
    addToDay = 1;
  } else if (day === '모레') {
    addToDay = 2;
  }

  if (isTomorrow) addToDay += 1;

  // if (day === '내일') {
  //   date.setDate(date.getDate() + 1);
  // } else if (day === '모레') {
  //   date.setDate(date.getDate() + 1);
  // }
  date.setDate(date.getDate() + addToDay);

  date.setHours(time);
  date.setMinutes(0);
  date.setSeconds(0);

  return dateToISO(date);
}
