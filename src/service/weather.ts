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

  //currentKST = 현재 KST 시간
  const currentKST = new Date();
  const offset = 1000 * 60 * 60 * 9;

  //currentKST 에 9시간 더한 후 toISOString 변환
  const currentKSTString = new Date(currentKST.getTime() + offset);
  const nowDateTime = currentKSTString.toISOString().slice(0, -5);

  const defaultStartTime = getCurrentKST();

  //endOfTodayKST 당일 오후 11시로 세팅
  const endOfTodayKST = currentKST.setHours(23, 0, 0, 0);
  //endOfTodayKST 에 9시간 더한 후 toISOString 변환
  const endOfTodayKSTString = new Date(
    new Date(endOfTodayKST).getTime() + offset
  )
    .toISOString()
    .slice(0, -5);

  let finalEndTime;
  // 현재시간에 8시간 더한 값이 오늘 23시를 넘어가면 오늘 23시로 세팅
  if (
    currentKSTString.getTime() + 1000 * 60 * 60 * 8 >
    new Date(endOfTodayKST).getTime()
  ) {
    finalEndTime = endOfTodayKSTString;
  } else {
    finalEndTime = new Date(currentKSTString.getTime() + 1000 * 60 * 60 * 8)
      .toISOString()
      .slice(0, -5);
  }

  // 사용자가 입력한 시작, 종료 시간이 있으면 그 시간을 사용하고, 없으면 기본 시작, 종료 시간을 사용
  const startDateTime = startTime
    ? formatToISOString(selectedDay, startTime)
    : defaultStartTime;
  const endDateTime = endTime
    ? formatToISOString(selectedDay, endTime)
    : finalEndTime;

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
