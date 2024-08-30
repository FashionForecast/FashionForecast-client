import { WeatherResponse } from '@/types/weather';

type WeatherTimeLimeProps = Pick<WeatherResponse['data'], 'forecasts'>;

const WeatherTimeLine = ({ forecasts }: WeatherTimeLimeProps) => {
  return (
    <ol>
      {forecasts.map((v, i) => (
        <li key={i}>
          <time>{v.fcstTime}</time>
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
