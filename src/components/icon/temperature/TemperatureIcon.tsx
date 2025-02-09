import IconLoading from '@/components/IconLoading/IconLoading';
import { lazy, Suspense } from 'react';
const ColdIcon = lazy(() => import('./ColdIcon'));
const CoolIcon = lazy(() => import('./CoolIcon'));
const HotIcon = lazy(() => import('./HotIcon'));
const ModerateIcon = lazy(() => import('./ModerateIcon'));
const WarmIcon = lazy(() => import('./WarmIcon'));

type TemperatureIconProps = {
  extremumTmp: number;
};

/**
 * 기온에 따른 아이콘 표시
 */
const TemperatureIcon = ({ extremumTmp }: TemperatureIconProps) => {
  const Icon = getIcon(extremumTmp);

  return (
    <Suspense fallback={<IconLoading $width={40} $height={40} />}>
      <Icon />
    </Suspense>
  );
};

export default TemperatureIcon;

function getIcon(extremumTmp: number) {
  if (extremumTmp <= 16) return ColdIcon;
  if (extremumTmp <= 19) return CoolIcon;
  if (extremumTmp <= 22) return ModerateIcon;
  if (extremumTmp <= 27) return WarmIcon;
  return HotIcon;
}
