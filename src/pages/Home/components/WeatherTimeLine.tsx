import { WeatherResponse } from '@/types/weather';

type WeatherTimeLimeProps = Pick<WeatherResponse['data'], 'forecasts'>;

const WeatherTimeLine = ({ forecasts }: WeatherTimeLimeProps) => {
  return (
    <ol>
      {forecasts.map((v, i) => (
        <li key={i}>
          <time>{timeFormatting(v.fcstTime)}</time>
          <div>
            {v.skyStatus} {v.rainType}
          </div>
          <span>{v.tmp}°C</span>
          <span>{v.pop}%</span>
        </li>
      ))}
    </ol>
  );
};

export default WeatherTimeLine;

function timeFormatting(fcstTime: string) {
  let hour = fcstTime.slice(0, 2);
  const numHour = Number(hour);
  const AMPM = numHour < 12 ? 'AM' : 'PM';

  if (numHour === 0) hour = '12';
  else if (numHour >= 13) hour = (numHour - 12).toString().padStart(2, '0');

  return `${hour} ${AMPM}`;
}
