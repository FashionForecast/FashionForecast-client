import 반팔티 from '@/components/clothes/반팔티';
import 민소매 from '@/components/clothes/민소매';
import 긴팔티 from '@/components/clothes/긴팔티';
import 후드티 from '@/components/clothes/후드티';
import 니트 from '@/components/clothes/니트';
import 트렌치코트 from '@/components/clothes/트렌치코트';
import 코트 from '@/components/clothes/코트';
import 패딩 from '@/components/clothes/패딩';
import 반바지 from '@/components/clothes/반바지';
import 바지 from '@/components/clothes/바지';
import 청바지 from '@/components/clothes/청바지';
import 기모바지 from '@/components/clothes/기모바지';
import 치마 from '@/components/clothes/치마';
import 긴치마 from '@/components/clothes/긴치마';

export const MAN_TOP_COLTHES = [
  { name: '민소매', Clothes: 민소매 },
  { name: '반팔티', Clothes: 반팔티 },
  { name: '긴팔티', Clothes: 긴팔티 },
  { name: '후드티', Clothes: 후드티 },
  { name: '니트', Clothes: 니트 },
  { name: '트렌치 코트', Clothes: 트렌치코트 },
  { name: '코트', Clothes: 코트 },
  { name: '패딩', Clothes: 패딩 },
];

export const MAN_BOTTOM_CLOTHES = [
  { name: '반바지', Clothes: 반바지 },
  { name: '바지', Clothes: 바지 },
  { name: '청바지', Clothes: 청바지 },
  { name: '기모 바지', Clothes: 기모바지 },
];

export const WOMAN_BOTTOM_CLOTHES = [
  ...MAN_BOTTOM_CLOTHES,
  { name: '치마', Clothes: 치마 },
  { name: '긴치마', Clothes: 긴치마 },
];
