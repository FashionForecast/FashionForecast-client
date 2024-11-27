import { ClothesIconNames } from '@/types/clothes';
import { lazy, Suspense } from 'react';
import IconLoading from '../IconLoading/IconLoading';

type ClotehsIconProps = {
  name: ClothesIconNames | null;
  color?: string;
};

const ClothesIcon = ({ name, color }: ClotehsIconProps) => {
  const Icon = name && clotehsIconsMap.get(name);
  return Icon ? (
    <Suspense fallback={<IconLoading $width={64} $height={64} />}>
      <Icon color={color} />
    </Suspense>
  ) : (
    <img src='' alt='' />
  );
};

export default ClothesIcon;

export const clotehsIconsMap = new Map([
  ['민소매', lazy(() => import('../icon/clothes/민소매'))],
  ['반팔티', lazy(() => import('../icon/clothes/반팔티'))],
  ['긴팔티', lazy(() => import('../icon/clothes/긴팔티'))],
  ['후드티', lazy(() => import('../icon/clothes/후드티'))],
  ['니트', lazy(() => import('../icon/clothes/니트'))],
  ['코트', lazy(() => import('../icon/clothes/코트'))],
  ['패딩', lazy(() => import('../icon/clothes/패딩'))],
  ['반바지', lazy(() => import('../icon/clothes/반바지'))],
  ['바지', lazy(() => import('../icon/clothes/바지'))],
  ['슬랙스', lazy(() => import('../icon/clothes/바지'))],
  ['면바지', lazy(() => import('../icon/clothes/바지'))],
  ['청바지', lazy(() => import('../icon/clothes/청바지'))],
  ['치마', lazy(() => import('../icon/clothes/치마'))],
  ['긴치마', lazy(() => import('../icon/clothes/긴치마'))],
  ['겉옷', lazy(() => import('../icon/clothes/겉옷'))],
  ['장우산', lazy(() => import('../icon/clothes/장우산'))],
  ['히트텍', lazy(() => import('../icon/clothes/히트텍'))],
  ['목도리', lazy(() => import('../icon/clothes/목도리'))],
  ['겉옷장우산', lazy(() => import('../icon/clothes/겉옷장우산'))],
  ['겉옷접이식우산', lazy(() => import('../icon/clothes/겉옷접이식우산'))],
  ['트렌치 코트', lazy(() => import('../icon/clothes/트렌치코트'))],
  ['기모 바지', lazy(() => import('../icon/clothes/기모바지'))],
  ['접이식 우산', lazy(() => import('../icon/clothes/접이식우산'))],
]);
