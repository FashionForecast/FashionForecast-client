import { Day, Time } from '@/widgets/time';

import { regionCoordinateList } from '@/shared/consts';
import { dateToISO, fetchAPI } from '@/shared/lib';

import { WeatherDto } from '../model/types';

export async function getWeather(
  times: Time[],
  day: Day,
  region: string
): Promise<WeatherDto> {
  const currentHour = new Date().getHours();
  const nowDateTime = dateToISO(new Date());
  const earliestStartHour = times[0].ranges[0];
  const nextEarliestStartHour =
    times.length >= 2 ? times[1].ranges[0] : earliestStartHour;
  const lastTime = times[times.length - 1];
  const latestEndHour = lastTime.ranges[lastTime.ranges.length - 1];

  const minStartDateTime = calculateDateTime({
    hour: Math.max(earliestStartHour, nextEarliestStartHour, currentHour),
    day,
  });
  const maxEndDateTime = calculateDateTime({
    hour: lastTime.isNextDay
      ? latestEndHour
      : Math.max(latestEndHour, currentHour),
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
