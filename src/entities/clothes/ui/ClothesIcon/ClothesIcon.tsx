import { lazy, Suspense } from 'react';

import { IconLoading } from '@/shared/ui';

import { ClothesIconNames } from '../../model/types';

type ClothesIconProps = {
  name: ClothesIconNames | null;
  color?: string;
};

export const ClothesIcon = ({ name, color }: ClothesIconProps) => {
  const Icon = name && clothesIconsMap.get(name);

  return Icon ? (
    <Suspense fallback={<IconLoading $width={64} $height={64} />}>
      <Icon color={color} />
    </Suspense>
  ) : (
    <img src='' alt='' />
  );
};

const clothesIconsMap: Map<
  ClothesIconNames,
  React.LazyExoticComponent<
    ({ color }: React.SVGProps<SVGSVGElement>) => JSX.Element
  >
> = new Map([
  ['민소매', lazy(() => import('../icons/top/민소매'))],
  ['반팔티', lazy(() => import('../icons/top/반팔티'))],
  ['반팔 폴로', lazy(() => import('../icons/top/반팔폴로'))],
  ['반팔 셔츠', lazy(() => import('../icons/top/반팔셔츠'))],
  ['긴팔티', lazy(() => import('../icons/top/긴팔티'))],
  ['긴팔 폴로', lazy(() => import('../icons/top/긴팔폴로'))],
  ['긴팔 셔츠', lazy(() => import('../icons/top/긴팔셔츠'))],
  ['스웨트', lazy(() => import('../icons/top/스웨트'))],
  ['후드티', lazy(() => import('../icons/top/후드티'))],
  ['니트', lazy(() => import('../icons/top/니트'))],
  ['재킷', lazy(() => import('../icons/top/재킷'))],
  ['블레이저', lazy(() => import('../icons/top/블레이저'))],
  ['트렌치 코트', lazy(() => import('../icons/top/트렌치코트'))],
  ['코트', lazy(() => import('../icons/top/코트'))],
  ['필드 재킷', lazy(() => import('../icons/top/필드재킷'))],
  ['패딩', lazy(() => import('../icons/top/패딩'))],

  ['반바지', lazy(() => import('../icons/bottom/반바지'))],
  ['치마', lazy(() => import('../icons/bottom/치마'))],
  ['면바지', lazy(() => import('../icons/bottom/면바지'))],
  ['슬랙스', lazy(() => import('../icons/bottom/슬랙스'))],
  ['청바지', lazy(() => import('../icons/bottom/청바지'))],
  ['트레이닝 바지', lazy(() => import('../icons/bottom/트레이닝바지'))],
  ['스커트 스타킹', lazy(() => import('../icons/bottom/스커트스타킹'))],
  ['긴치마', lazy(() => import('../icons/bottom/긴치마'))],
  ['기모 바지', lazy(() => import('../icons/bottom/기모바지'))],
  ['스커트 레깅스', lazy(() => import('../icons/bottom/스커트레깅스'))],

  ['겉옷', lazy(() => import('../icons/etc/겉옷'))],
  ['겉옷장우산', lazy(() => import('../icons/etc/겉옷장우산'))],
  ['겉옷접이식우산', lazy(() => import('../icons/etc/겉옷접이식우산'))],
  ['목도리', lazy(() => import('../icons/etc/목도리'))],
  ['목도리장우산', lazy(() => import('../icons/etc/목도리장우산'))],
  ['목도리접이식우산', lazy(() => import('../icons/etc/목도리접이식우산'))],
  ['히트텍', lazy(() => import('../icons/etc/히트텍'))],
  ['히트텍장우산', lazy(() => import('../icons/etc/히트텍장우산'))],
  ['히트텍접이식우산', lazy(() => import('../icons/etc/히트텍접이식우산'))],
  ['접이식 우산', lazy(() => import('../icons/etc/접이식우산'))],
  ['장우산', lazy(() => import('../icons/etc/장우산'))],
]);
