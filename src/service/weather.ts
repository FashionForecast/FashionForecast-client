import weatherCoordinateList from '@/assets/weatherRegionCoordinates';
import { WeatherResponse } from '@/types/weather';
import formatToISOString from '@/utils/formatToISOString';

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

  //오늘 날짜의 끝 23시로 설정
  const endOfTodayKST = new Date(currentKST.getTime() + offset);
  endOfTodayKST.setHours(23, 0, 0, 0);

  //종료 시간 설정: 현재 시간 + 8시간 또는 오늘 23시 중 더 이른 것

  const finalEndTime = new Date(
    Math.min(currentKST.getTime() + 1000 * 60 * 60 * 8, endOfTodayKST.getTime())
  )
    .toISOString()
    .slice(0, -5);

  // 사용자가 입력한 시작, 종료 시간이 있으면 그 시간을 사용하고, 없으면 기본 시작, 종료 시간을 사용
  const startDateTime = startTime
    ? formatToISOString(selectedDay, startTime)
    : currentKSTString;
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
