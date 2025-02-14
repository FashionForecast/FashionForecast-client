import { RainType, SkyStatus } from '@/types/weather';
import { lazy, Suspense } from 'react';
import { IconLoading } from '@/shared/ui/IconLoading/IconLoading';

type WeatherIconProps = {
  fcstTime: string;
  skyStatus: SkyStatus;
  rainType: RainType;
};

/**
 * 시간대별 날씨 아이콘 표시
 */
export const WeatherIcon = ({
  fcstTime,
  skyStatus,
  rainType,
}: WeatherIconProps) => {
  const hour = Number(fcstTime.slice(0, 2));
  const icons = hour >= 6 && hour <= 18 ? DayIcons : NightIcons;
  let Icon;

  if (rainType === 'NONE') Icon = icons[skyStatus];
  else Icon = icons[rainType];

  return Icon ? (
    <Suspense fallback={<IconLoading $width={24} $height={24} />}>
      <Icon />
    </Suspense>
  ) : (
    <img src='' alt='' />
  );
};

const DayIcons = {
  CLEAR: lazy(() => import('./DayClearIcon')),
  PARTLY_CLOUDY: lazy(() => import('./DayPartlyCloudyIcon')),
  CLOUDY: lazy(() => import('./DayCloudyIcon')),
  RAIN: lazy(() => import('./DayRainIcon')),
  RAIN_DROP: lazy(() => import('./DayRainDropIcon')),
  RAIN_AND_SNOW: lazy(() => import('./DayRainAndSnowIcon')),
  RAIN_AND_SNOW_FLURRIES: lazy(() => import('./DayRainAndSnowFlurriesIcon')),
  SHOWER: lazy(() => import('./DayShowerIcon')),
  SNOW: lazy(() => import('./DaySnowIcon')),
  SNOW_FLURRIES: lazy(() => import('./DaySnowFlurriesIcon')),
};

const NightIcons = {
  CLEAR: lazy(() => import('./NightClearIcon')),
  PARTLY_CLOUDY: lazy(() => import('./NightPartlyCloudyIcon')),
  CLOUDY: lazy(() => import('./NightCloudyIcon')),
  RAIN: lazy(() => import('./NightRainIcon')),
  RAIN_DROP: lazy(() => import('./NightRainDropIcon')),
  RAIN_AND_SNOW: lazy(() => import('./NightRainAndSnowIcon')),
  RAIN_AND_SNOW_FLURRIES: lazy(() => import('./NightRainAndSnowFlurriesIcon')),
  SHOWER: lazy(() => import('./NightShowerIcon')),
  SNOW: lazy(() => import('./NightSnowIcon')),
  SNOW_FLURRIES: lazy(() => import('./NightSnowFlurriesIcon')),
};
