import { ClothesIconNames } from '@/shared/types/clothes';

export const MAN_TOP_COLTHES: ClothesIconNames[] = [
  '민소매',
  '반팔티',
  '긴팔티',
  '후드티',
  '니트',
  '트렌치 코트',
  '코트',
  '패딩',
];

export const MAN_BOTTOM_CLOTHES: ClothesIconNames[] = [
  '반바지',
  '바지',
  '청바지',
  '기모 바지',
];

export const WOMAN_BOTTOM_CLOTHES: ClothesIconNames[] = [
  ...MAN_BOTTOM_CLOTHES,
  '치마',
  '긴치마',
];

export const clothesIconNameList = new Set<ClothesIconNames>([
  '민소매',
  '반팔티',
  '긴팔티',
  '후드티',
  '니트',
  '코트',
  '패딩',
  '반바지',
  '바지',
  '슬랙스',
  '면바지',
  '청바지',
  '치마',
  '긴치마',
  '겉옷',
  '장우산',
  '히트텍',
  '목도리',
  '겉옷장우산',
  '겉옷접이식우산',
  '트렌치 코트',
  '기모 바지',
  '접이식 우산',
]);
