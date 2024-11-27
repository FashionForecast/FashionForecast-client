import { ClothesIconNames } from '@/types/clothes';
import 겉옷 from '../icon/clothes/겉옷';
import 겉옷장우산 from '../icon/clothes/겉옷장우산';
import 겉옷접이식우산 from '../icon/clothes/겉옷접이식우산';
import 기모바지 from '../icon/clothes/기모바지';
import 긴치마 from '../icon/clothes/긴치마';
import 긴팔티 from '../icon/clothes/긴팔티';
import 니트 from '../icon/clothes/니트';
import 목도리 from '../icon/clothes/목도리';
import 민소매 from '../icon/clothes/민소매';
import 바지 from '../icon/clothes/바지';
import 반바지 from '../icon/clothes/반바지';
import 반팔티 from '../icon/clothes/반팔티';
import 장우산 from '../icon/clothes/장우산';
import 접이식우산 from '../icon/clothes/접이식우산';
import 청바지 from '../icon/clothes/청바지';
import 치마 from '../icon/clothes/치마';
import 코트 from '../icon/clothes/코트';
import 트렌치코트 from '../icon/clothes/트렌치코트';
import 패딩 from '../icon/clothes/패딩';
import 후드티 from '../icon/clothes/후드티';
import 히트텍 from '../icon/clothes/히트텍';

type ClotehsIconProps = {
  name: ClothesIconNames | null;
  color?: string;
};

const ClothesIcon = ({ name, color }: ClotehsIconProps) => {
  const Icon = name && clotehsIconsMap.get(name);
  return Icon ? <Icon color={color} /> : <img src='' alt='' />;
};

export default ClothesIcon;

export const clotehsIconsMap = new Map([
  ['민소매', 민소매],
  ['반팔티', 반팔티],
  ['긴팔티', 긴팔티],
  ['후드티', 후드티],
  ['니트', 니트],
  ['코트', 코트],
  ['패딩', 패딩],
  ['반바지', 반바지],
  ['바지', 바지],
  ['슬랙스', 바지],
  ['면바지', 바지],
  ['청바지', 청바지],
  ['치마', 치마],
  ['긴치마', 긴치마],
  ['겉옷', 겉옷],
  ['장우산', 장우산],
  ['히트텍', 히트텍],
  ['목도리', 목도리],
  ['겉옷장우산', 겉옷장우산],
  ['겉옷접이식우산', 겉옷접이식우산],
  ['트렌치 코트', 트렌치코트],
  ['기모 바지', 기모바지],
  ['접이식 우산', 접이식우산],
]);
