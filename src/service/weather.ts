import { WeatherResponse } from '@/types/weather';



export async function getWeather(): Promise<WeatherResponse> {
  const offset = 1000 * 60 * 60 * 9;
  const KTCnow = new Date(new Date().getTime() + offset);
  const now = KTCnow.toISOString().slice(0, -5);

  console.log(now);

  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
        //Todo: StartDateTime과 EndDateTime Timeselector로 받아오기
      }/weather/forecast?nowDateTime=${now}&startDateTime=2024-08-26T07:00:00&endDateTime=2024-08-26T13:00:00&nx=60&ny=127`
    );
    const json = await res.json();
    console.log(json);

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json;
  } catch (error) {
    throw new Error(error as string);
  }
}

