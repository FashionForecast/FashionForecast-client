import { lazy, Suspense } from 'react';

import { WeatherTypeName } from '@/entities/weather';

import { IconLoading } from '@/shared/ui';

const SwelteringFaceIcon = lazy(() => import('./icon/SwelteringFaceIcon'));
const HotFaceIcon = lazy(() => import('./icon/HotFaceIcon'));
const WarmFaceIcon = lazy(() => import('./icon/WarmFaceIcon'));
const ModerateFaceIcon = lazy(() => import('./icon/ModerateFaceIcon'));
const CoolFaceIcon = lazy(() => import('./icon/CoolFaceIcon'));
const ChillyFaceIcon = lazy(() => import('./icon/ChillyFaceIcon'));
const ColdFaceIcon = lazy(() => import('./icon/ColdFaceIcon'));
const FrigidFaceIcon = lazy(() => import('./icon/FrigidFaceIcon'));

type WeatherFaceIconProps = {
  weatherName: WeatherTypeName;
};
export const WeatherFaceIcon = ({ weatherName }: WeatherFaceIconProps) => {
  const FaceIcon = mapFaceIcon(weatherName);

  return (
    <Suspense fallback={<IconLoading $width={24} $height={24} />}>
      <FaceIcon />
    </Suspense>
  );
};

function mapFaceIcon(weatherName: WeatherTypeName) {
  if (weatherName === 'sweltering') return SwelteringFaceIcon;
  if (weatherName === 'hot') return HotFaceIcon;
  if (weatherName === 'warm') return WarmFaceIcon;
  if (weatherName === 'moderate') return ModerateFaceIcon;
  if (weatherName === 'cool') return CoolFaceIcon;
  if (weatherName === 'chilly') return ChillyFaceIcon;
  if (weatherName === 'cold') return ColdFaceIcon;

  return FrigidFaceIcon;
}
