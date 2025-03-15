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

type ValidRainType = Exclude<RainType, 'NONE'>;

type COMMON_ICON_MAP = Record<
  ValidRainType,
  React.LazyExoticComponent<() => JSX.Element>
>;

type ICON_MAP_TYPE = Record<
  ValidRainType | SkyStatus,
  React.LazyExoticComponent<() => JSX.Element>
>;

const COMMON_ICON_MAP: COMMON_ICON_MAP = {
  RAIN: lazy(() => import('./icon/weather/RainIcon')),
  RAIN_DROP: lazy(() => import('./icon/weather/RainDropIcon')),
  RAIN_AND_SNOW: lazy(() => import('./icon/weather/RainAndSnowIcon')),
  RAIN_AND_SNOW_FLURRIES: lazy(
    () => import('./icon/weather/RainAndSnowFlurriesIcon')
  ),
  SHOWER: lazy(() => import('./icon/weather/ShowerIcon')),
  SNOW: lazy(() => import('./icon/weather/SnowIcon')),
  SNOW_FLURRIES: lazy(() => import('./icon/weather/SnowFlurriesIcon')),
};

const DAY_ICON_MAP: ICON_MAP_TYPE = {
  CLEAR: lazy(() => import('./icon/weather/DayClearIcon')),
  PARTLY_CLOUDY: lazy(() => import('./icon/weather/DayPartlyCloudyIcon')),
  CLOUDY: lazy(() => import('./icon/weather/DayCloudyIcon')),
  ...COMMON_ICON_MAP,
};

const NIGHT_ICON_MAP: ICON_MAP_TYPE = {
  CLEAR: lazy(() => import('./icon/weather/NightClearIcon')),
  PARTLY_CLOUDY: lazy(() => import('./icon/weather/NightPartlyCloudyIcon')),
  CLOUDY: lazy(() => import('./icon/weather/NightCloudyIcon')),
  ...COMMON_ICON_MAP,
};
