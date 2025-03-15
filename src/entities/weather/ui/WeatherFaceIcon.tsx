import { lazy, Suspense } from 'react';

import { WeatherTypeName } from '@/entities/weather';

import { IconLoading } from '@/shared/ui';

const SwelteringFaceIcon = lazy(() => import('./icon/face/SwelteringFaceIcon'));
const HotFaceIcon = lazy(() => import('./icon/face/HotFaceIcon'));
const WarmFaceIcon = lazy(() => import('./icon/face/WarmFaceIcon'));
const ModerateFaceIcon = lazy(() => import('./icon/face/ModerateFaceIcon'));
const CoolFaceIcon = lazy(() => import('./icon/face/CoolFaceIcon'));
const ChillyFaceIcon = lazy(() => import('./icon/face/ChillyFaceIcon'));
const ColdFaceIcon = lazy(() => import('./icon/face/ColdFaceIcon'));
const FrigidFaceIcon = lazy(() => import('./icon/face/FrigidFaceIcon'));

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
