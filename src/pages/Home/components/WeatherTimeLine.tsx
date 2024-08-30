import DayImage from '@/assets/weatherIconImage/DayImages';
import NightImage from '@/assets/weatherIconImage/NightImages';
import { RainType, SkyStatus, WeatherResponse } from '@/types/weather';

type WeatherTimeLimeProps = Pick<WeatherResponse['data'], 'forecasts'>;

const WeatherTimeLine = ({ forecasts }: WeatherTimeLimeProps) => {
  return (
    <ol>
      {forecasts.map((v, i) => (
        <li key={i}>
          <time>{timeFormatting(v.fcstTime)}</time>
          <div>{getWeatherImage(v.fcstTime, v.skyStatus, v.rainType)}</div>
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

function getWeatherImage(
  fcstTime: string,
  skystatus: SkyStatus,
  rainType: RainType
) {
  const hour = Number(fcstTime.slice(0, 2));
  const image = hour < 12 ? DayImage : NightImage;
  let SvgComponent;

  if (rainType === 'NONE') {
    if (skystatus === 'CLEAR') SvgComponent = image.Clear;
    else if (skystatus === 'CLOUDY') SvgComponent = image.Cloudy;
    else if (skystatus === 'PARTLY_CLOUDY') SvgComponent = image.PartlyCloudy;
  } else {
    if (rainType === 'RAIN') SvgComponent = image.Rain;
    else if (rainType === 'RAIN_AND_SNOW') SvgComponent = image.RainAndSnow;
    else if (rainType === 'SNOW') SvgComponent = image.Snow;
    else if (rainType === 'SHOWER') SvgComponent = image.Shower;
    else if (rainType === 'RAIN_DROP') SvgComponent = image.RainDrop;
    else if (rainType === 'RAIN_AND_SNOW_FLURRIES')
      SvgComponent = image.RainAndSnowFlurries;
    else if (rainType === 'SNOW_FLURRIES') SvgComponent = image.SnowFlurries;
  }

  return SvgComponent ? <SvgComponent /> : <img src='not' alt='.' />;
}
