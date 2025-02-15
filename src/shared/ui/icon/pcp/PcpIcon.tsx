import { lazy, Suspense } from 'react';

import { IconLoading } from '@/shared/ui';
const PcpClearIcon = lazy(() => import('./PcpClearIcon'));
const PcpRaindropIcon = lazy(() => import('./PcpRaindropIcon'));
const PcpRainIcon = lazy(() => import('./PcpRainIcon'));

type PcpIconProps = {
  maximumPcp: number;
};

/**
 * 강수량에 따른 아이콘 표시
 */
export const PcpIcon = ({ maximumPcp }: PcpIconProps) => {
  const Icon = getIcon(maximumPcp);

  return (
    <Suspense fallback={<IconLoading $width={40} $height={40} />}>
      <Icon />
    </Suspense>
  );
};

function getIcon(maximumPcp: number) {
  if (maximumPcp <= 0) return PcpClearIcon;
  if (maximumPcp < 3) return PcpRaindropIcon;
  return PcpRainIcon;
}
