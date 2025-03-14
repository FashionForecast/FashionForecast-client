import { lazy, Suspense } from 'react';

import { Forecast, RainType, SkyStatus } from '@/entities/weather';

import { IconLoading } from '@/shared/ui/IconLoading/IconLoading';

type WeatherIconProps = { forecast: Forecast };

export const WeatherIcon = ({ forecast }: WeatherIconProps) => {
  const MatchingIcon = getMatchingIcon(forecast);

  return MatchingIcon ? (
    <Suspense fallback={<IconLoading $width={24} $height={24} />}>
      <MatchingIcon />
    </Suspense>
  ) : (
    <img src='' alt='' />
  );
};

function getMatchingIcon(forecast: Forecast) {
  const { fcstTime, skyStatus, rainType, pop, pcp } = forecast;
  const hour = Number(fcstTime.slice(0, 2));
  const isDayTime = hour >= 6 && hour <= 18;
  const iconsMap = isDayTime ? DAY_ICON_MAP : NIGHT_ICON_MAP;

  if (pcp >= 10) return iconsMap['SHOWER'];
  if (pop >= 30 && pcp >= 3) return iconsMap['RAIN'];
  if (pop >= 30 || pcp >= 3) return iconsMap['RAIN_DROP'];

  return iconsMap[rainType === 'NONE' ? skyStatus : rainType];
}

type ICON_MAP_TYPE = Record<
  Exclude<RainType, 'NONE'> | SkyStatus,
  React.LazyExoticComponent<() => JSX.Element>
>;

const DAY_ICON_MAP: ICON_MAP_TYPE = {
  CLEAR: lazy(() => import('./icon/weather/DayClearIcon')),
  PARTLY_CLOUDY: lazy(() => import('./icon/weather/DayPartlyCloudyIcon')),
  CLOUDY: lazy(() => import('./icon/weather/DayCloudyIcon')),
  RAIN: lazy(() => import('./icon/weather/DayRainIcon')),
  RAIN_DROP: lazy(() => import('./icon/weather/DayRainDropIcon')),
  RAIN_AND_SNOW: lazy(() => import('./icon/weather/DayRainAndSnowIcon')),
  RAIN_AND_SNOW_FLURRIES: lazy(
    () => import('./icon/weather/DayRainAndSnowFlurriesIcon')
  ),
  SHOWER: lazy(() => import('./icon/weather/DayShowerIcon')),
  SNOW: lazy(() => import('./icon/weather/DaySnowIcon')),
  SNOW_FLURRIES: lazy(() => import('./icon/weather/DaySnowFlurriesIcon')),
};

const NIGHT_ICON_MAP: ICON_MAP_TYPE = {
  CLEAR: lazy(() => import('./icon/weather/NightClearIcon')),
  PARTLY_CLOUDY: lazy(() => import('./icon/weather/NightPartlyCloudyIcon')),
  CLOUDY: lazy(() => import('./icon/weather/NightCloudyIcon')),
  RAIN: lazy(() => import('./icon/weather/NightRainIcon')),
  RAIN_DROP: lazy(() => import('./icon/weather/NightRainDropIcon')),
  RAIN_AND_SNOW: lazy(() => import('./icon/weather/NightRainAndSnowIcon')),
  RAIN_AND_SNOW_FLURRIES: lazy(
    () => import('./icon/weather/NightRainAndSnowFlurriesIcon')
  ),
  SHOWER: lazy(() => import('./icon/weather/NightShowerIcon')),
  SNOW: lazy(() => import('./icon/weather/NightSnowIcon')),
  SNOW_FLURRIES: lazy(() => import('./icon/weather/NightSnowFlurriesIcon')),
};
