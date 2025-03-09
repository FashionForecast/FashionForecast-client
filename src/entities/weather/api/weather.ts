import { Day, Time } from '@/widgets/time';

import { regionCoordinateList } from '@/shared/consts';
import { dateToISO, KSTDate, fetchAPI } from '@/shared/lib';

import { WeatherDto } from '../model/types';

export async function getWeather(
  times: Time[],
  day: Day,
  region: string
): Promise<WeatherDto> {
  const nowDateTime = dateToISO(KSTDate());
  const minStartDateTime = convertToTime(times[0].ranges[0], day);
  const maxEndDateTime = convertToTime(
    times.at(-1)?.ranges.at(-1),
    day,
    times[times.length - 1].isNextDay
  );

  const { nx, ny } = regionCoordinateList[region];

  const params = new URLSearchParams({
    nowDateTime,
    minStartDateTime,
    maxEndDateTime,
    nx: String(nx),
    ny: String(ny),
  });

  times.forEach(({ ranges, isNextDay }) => {
    const tomorrowIndex = isNextDay ? ranges.findIndex((i) => i === 0) : null;
    ranges.forEach((time, i) => {
      const timeString = convertToTime(
        time,
        day,
        tomorrowIndex !== null && i >= tomorrowIndex && isNextDay
      );
      params.append('selectedTimes', timeString);
    });
  });

  const queryString = params.toString();

  return await fetchAPI(`/weather/forecast/group?${queryString}`);
}

function convertToTime(
  time: number | undefined,
  day: Day,
  isNextDay?: boolean
) {
  if (time === undefined) {
    throw Error('time이 존재하지 않습니다.');
  }

  const date = KSTDate();

  let addToDay = 0;
  if (day === '내일') {
    addToDay = 1;
  } else if (day === '모레') {
    addToDay = 2;
  }

  if (isNextDay) addToDay += 1;

  date.setDate(date.getDate() + addToDay);

  date.setHours(time);
  date.setMinutes(0);
  date.setSeconds(0);

  return dateToISO(date);
}
