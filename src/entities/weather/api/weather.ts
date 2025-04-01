import { Day, Time } from '@/widgets/time';

import { regionCoordinateList } from '@/shared/consts';
import { dateToISO, fetchAPI } from '@/shared/lib';

import { WeatherDto } from '../model/types';

export async function getWeather(
  times: Time[],
  day: Day,
  region: string
): Promise<WeatherDto> {
  const nowDateTime = dateToISO(new Date());
  const lastTime = times[times.length - 1];
  const minStartHour = calculateMinStartHour(times, day);
  const minEndHour = calculateMinEndHour(times, day);

  const minStartDateTime = calculateDateTime({
    hour: minStartHour,
    day,
  });
  const maxEndDateTime = calculateDateTime({
    hour: minEndHour,
    day,
    isNextDay: lastTime.isNextDay,
  });

  const { nx, ny } = regionCoordinateList[region];

  const params = new URLSearchParams({
    nowDateTime,
    minStartDateTime,
    maxEndDateTime,
    nx: String(nx),
    ny: String(ny),
  });

  times.forEach(({ ranges, isNextDay }) => {
    ranges.forEach((hour) => {
      const selectedTimeDate = calculateDateTime({
        hour,
        day,
        isNextDay: isNextDay && ranges[0] > hour,
      });

      params.append('selectedTimes', selectedTimeDate);
    });
  });

  const queryString = params.toString();

  return await fetchAPI(`/weather/forecast/group?${queryString}`);
}

function calculateMinStartHour(times: Time[], day: Day) {
  if (day !== '오늘') {
    const earliestStartHour = times[0].ranges[0];
    return earliestStartHour;
  }

  const currentHour = new Date().getHours();
  const startHour = times
    .filter((time) => !time.isNextDay)
    .flatMap((time) => time.ranges)
    .find((hour) => hour >= currentHour);

  return startHour ?? currentHour;
}

function calculateMinEndHour(times: Time[], day: Day) {
  const lastTime = times[times.length - 1];
  const latestEndHour = lastTime.ranges[lastTime.ranges.length - 1];

  if (day !== '오늘') {
    return latestEndHour;
  }

  const currentHour = new Date().getHours();
  return lastTime.isNextDay
    ? latestEndHour
    : Math.max(latestEndHour, currentHour);
}

function calculateDateTime({
  hour,
  day,
  isNextDay,
}: {
  hour: number;
  day: Day;
  isNextDay?: boolean;
}) {
  const date = new Date();

  let addToDay = 0;
  if (day === '내일') addToDay = 1;
  else if (day === '모레') addToDay = 2;

  if (isNextDay) addToDay += 1;

  date.setDate(date.getDate() + addToDay);
  date.setHours(hour, 0, 0, 0);

  return dateToISO(date);
}
