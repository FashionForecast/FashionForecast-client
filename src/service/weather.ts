import weatherCoordinateList from '@/assets/weatherRegionCoordinates';
import { WeatherResponse } from '@/types/weather';
import formatToISOString from '@/utils/formatToISOString';
import getCurrentKST from '@/utils/time';

export async function getWeather(
  region?: string,
  selectedDay?: string,
  startTime?: string,
  endTime?: string
): Promise<WeatherResponse | null> {
  if (!region) return null;

  const currentUTC = new Date();
  const offset = 1000 * 60 * 60 * 9;

  const currentKST = new Date(currentUTC.getTime() + offset);
  const currentKSTString = currentKST.toISOString().slice(0, -5);

  const finalStartTime = getCurrentKST();
  // endOfTodayKST = 당일 오전 8시(toISOString 변환을 위함)
  const endOfTodayKST = new Date(currentKST.setHours(8, 0, 0, 0));

  let finalEndTime;
  //endOFTodayUTC = 당일 오후 11시
  const endOfTodayUTC = new Date(endOfTodayKST.getTime() - offset);
  console.log('endOfTodayUTC', endOfTodayUTC);
  const endOfTodayKSTString = endOfTodayKST.toISOString().slice(0, -5);

  console.log('endOfTodayKSTString', endOfTodayKSTString);

  if (currentUTC.getTime() + 1000 * 60 * 60 * 8 > endOfTodayUTC.getTime()) {
    finalEndTime = endOfTodayKSTString;
  } else {
    finalEndTime = new Date(currentUTC.getTime() + 1000 * 60 * 60 * 8)
      .toISOString()
      .slice(0, -5);
  }

  console.log('2', endOfTodayUTC.toISOString().slice(0, -5));

  // 사용자가 입력한 시작, 종료 시간이 있으면 그 시간을 사용하고, 없으면 기본 시작, 종료 시간을 사용
  const startDateTime = startTime
    ? formatToISOString(selectedDay, startTime)
    : finalStartTime;
  const endDateTime = endTime
    ? formatToISOString(selectedDay, endTime)
    : finalEndTime;

  const { weatherNx, weatherNy } = weatherCoordinateList[region];

  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/weather/forecast?nowDateTime=${currentKSTString}&startDateTime=${startDateTime}&endDateTime=${endDateTime}&nx=${weatherNx}&ny=${weatherNy}`
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
