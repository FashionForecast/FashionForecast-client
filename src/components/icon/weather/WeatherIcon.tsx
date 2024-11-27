import { RainType, SkyStatus } from '@/types/weather';
import DayClearIcon from './DayClearIcon';
import DayCloudyIcon from './DayCloudyIcon';
import DayPartlyCloudyIcon from './DayPartlyCloudyIcon';
import DayRainAndSnowFlurriesIcon from './DayRainAndSnowFlurriesIcon';
import DayRainAndSnowIcon from './DayRainAndSnowIcon';
import DayRainDropIcon from './DayRainDropIcon';
import DayRainIcon from './DayRainIcon';
import DayShowerIcon from './DayShowerIcon';
import DaySnowFlurriesIcon from './DaySnowFlurriesIcon';
import DaySnowIcon from './DaySnowIcon';
import NightClearIcon from './NightClearIcon';
import NightCloudyIcon from './NightCloudyIcon';
import NightPartlyCloudyIcon from './NightPartlyCloudyIcon';
import NightRainAndSnowFlurriesIcon from './NightRainAndSnowFlurriesIcon';
import NightRainAndSnowIcon from './NightRainAndSnowIcon';
import NightRainDropIcon from './NightRainDropIcon';
import NightRainIcon from './NightRainIcon';
import NightShowerIcon from './NightShowerIcon';
import NightSnowFlurriesIcon from './NightSnowFlurriesIcon';
import NightSnowIcon from './NightSnowIcon';

type WeatherIconProps = {
  fcstTime: string;
  skyStatus: SkyStatus;
  rainType: RainType;
};

/**
 * 시간대별 날씨 아이콘 표시
 */
const WeatherIcon = ({ fcstTime, skyStatus, rainType }: WeatherIconProps) => {
  const hour = Number(fcstTime.slice(0, 2));
  const icons = hour >= 6 && hour <= 18 ? DayIcons : NightIcons;
  let Icon;

  if (rainType === 'NONE') Icon = icons[skyStatus];
  else Icon = icons[rainType];

  return Icon ? <Icon /> : <img src='' alt='' />;
};

export default WeatherIcon;

const DayIcons = {
  CLEAR: DayClearIcon,
  PARTLY_CLOUDY: DayPartlyCloudyIcon,
  CLOUDY: DayCloudyIcon,
  RAIN: DayRainIcon,
  RAIN_DROP: DayRainDropIcon,
  RAIN_AND_SNOW: DayRainAndSnowIcon,
  RAIN_AND_SNOW_FLURRIES: DayRainAndSnowFlurriesIcon,
  SHOWER: DayShowerIcon,
  SNOW: DaySnowIcon,
  SNOW_FLURRIES: DaySnowFlurriesIcon,
};

const NightIcons = {
  CLEAR: NightClearIcon,
  PARTLY_CLOUDY: NightPartlyCloudyIcon,
  CLOUDY: NightCloudyIcon,
  RAIN: NightRainIcon,
  RAIN_DROP: NightRainDropIcon,
  RAIN_AND_SNOW: NightRainAndSnowIcon,
  RAIN_AND_SNOW_FLURRIES: NightRainAndSnowFlurriesIcon,
  SHOWER: NightShowerIcon,
  SNOW: NightSnowIcon,
  SNOW_FLURRIES: NightSnowFlurriesIcon,
};
