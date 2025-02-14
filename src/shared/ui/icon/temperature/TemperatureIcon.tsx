import { IconLoading } from '@/shared/ui';
import { lazy, Suspense } from 'react';
const ColdIcon = lazy(() =>
  import('./ColdIcon').then((module) => ({ default: module.ColdIcon }))
);
const CoolIcon = lazy(() =>
  import('./CoolIcon').then((module) => ({ default: module.CoolIcon }))
);
const HotIcon = lazy(() =>
  import('./HotIcon').then((module) => ({ default: module.HotIcon }))
);
const ModerateIcon = lazy(() =>
  import('./ModerateIcon').then((module) => ({ default: module.ModerateIcon }))
);
const WarmIcon = lazy(() =>
  import('./WarmIcon').then((module) => ({ default: module.WarmIcon }))
);

type TemperatureIconProps = {
  extremumTmp: number;
};

/**
 * 기온에 따른 아이콘 표시
 */
export const TemperatureIcon = ({ extremumTmp }: TemperatureIconProps) => {
  const Icon = getIcon(extremumTmp);

  return (
    <Suspense fallback={<IconLoading $width={40} $height={40} />}>
      <Icon />
    </Suspense>
  );
};

function getIcon(extremumTmp: number) {
  if (extremumTmp <= 16) return ColdIcon;
  if (extremumTmp <= 19) return CoolIcon;
  if (extremumTmp <= 22) return ModerateIcon;
  if (extremumTmp <= 27) return WarmIcon;
  return HotIcon;
}
