import { ClothesIconNames } from '@/types/clothes';

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
