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
      }/weather/forecast?now=${now}&nx=60&ny=127`
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

