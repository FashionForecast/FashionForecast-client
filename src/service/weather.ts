import { WeatherResponse } from '@/types/weather';

export async function getWeather(): Promise<WeatherResponse> {

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  const now = `${year}-${month}-${day}T${hour}:${minute}:${second}`;


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
