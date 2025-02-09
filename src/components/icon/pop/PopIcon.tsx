import IconLoading from '@/components/IconLoading/IconLoading';
import { lazy, Suspense } from 'react';
const Pop0Icon = lazy(() => import('./Pop0Icon'));
const Pop10Icon = lazy(() => import('./Pop10Icon'));
const Pop20Icon = lazy(() => import('./Pop20Icon'));
const Pop30Icon = lazy(() => import('./Pop30Icon'));
const Pop40Icon = lazy(() => import('./Pop40Icon'));
const Pop50Icon = lazy(() => import('./Pop50Icon'));
const Pop60Icon = lazy(() => import('./Pop60Icon'));
const Pop70Icon = lazy(() => import('./Pop70Icon'));
const Pop80Icon = lazy(() => import('./Pop80Icon'));
const Pop90Icon = lazy(() => import('./Pop90Icon'));
const Pop100Icon = lazy(() => import('./Pop100Icon'));

type PopIconProps = {
  maximumPop: number;
};

/**
 * 강수확률에 따른 아이콘 표시
 */
const PopIcon = ({ maximumPop }: PopIconProps) => {
  const Icon = getIcon(maximumPop);
  return (
    <Suspense fallback={<IconLoading $width={40} $height={40} />}>
      <Icon />
    </Suspense>
  );
};

export default PopIcon;

function getIcon(maximumPop: number) {
  if (maximumPop <= 0) return Pop0Icon;
  if (maximumPop < 20) return Pop10Icon;
  if (maximumPop < 30) return Pop20Icon;
  if (maximumPop < 40) return Pop30Icon;
  if (maximumPop < 50) return Pop40Icon;
  if (maximumPop < 60) return Pop50Icon;
  if (maximumPop < 70) return Pop60Icon;
  if (maximumPop < 80) return Pop70Icon;
  if (maximumPop < 90) return Pop80Icon;
  if (maximumPop < 100) return Pop90Icon;
  return Pop100Icon;
}
