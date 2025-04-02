import { lazy, Suspense } from 'react';

import { RainType, SkyStatus } from '@/entities/weather';

import { IconLoading } from '@/shared/ui/IconLoading/IconLoading';

type WeatherIconProps = { name: WeatherName; isDayTime?: boolean };

export const WeatherIcon = ({ name, isDayTime = true }: WeatherIconProps) => {
  const iconsMap = isDayTime ? DAY_ICON_MAP : NIGHT_ICON_MAP;
  const MatchingIcon = iconsMap[name];

  return MatchingIcon ? (
    <Suspense fallback={<IconLoading $width={24} $height={24} />}>
      <MatchingIcon />
    </Suspense>
  ) : (
    <img src='' alt='' />
  );
};

type ValidRainType = Exclude<RainType, 'NONE'>;
type WeatherName = ValidRainType | SkyStatus;

type ICON_MAP_TYPE = Record<
  WeatherName,
  React.LazyExoticComponent<() => JSX.Element>
>;

type COMMON_ICON_MAP = Record<
  ValidRainType,
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
