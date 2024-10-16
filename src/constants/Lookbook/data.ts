import { WeatherType } from '@/types/weather';
import 반팔티 from '@/components/clothes/반팔티';
import 민소매 from '@/components/clothes/민소매';
import 긴팔티 from '@/components/clothes/긴팔티';
import 후드티 from '@/components/clothes/후드티';
import 니트 from '@/components/clothes/니트';
import 트렌치코트 from '@/components/clothes/트렌치코트';
import 코트 from '@/components/clothes/코트';
import 패딩 from '@/components/clothes/패딩';

export const LOOKBOOK_WEATHER_TYPE: Record<
  WeatherType,
  { title: string; color: string }
> = {
  1: {
    title: '28°C 이상인 날이에요',
    color: '#FFC8C0',
  },
  2: {
    title: '23°C-28°C 가량의 날이에요',
    color: '#FFCA98',
  },
  3: {
    title: '20°C-23°C 가량의 날이에요',
    color: '#F2D41B',
  },
  4: {
    title: '17°C-20°C 가량의 날이에요',
    color: '#CAE02A',
  },
  5: {
    title: '12°C-17°C 가량의 날이에요',
    color: '#7FEB90',
  },
  6: {
    title: '9°C-12°C 가량의 날이에요',
    color: '#68E7E8',
  },
  7: {
    title: '5°C-9°C 가량의 날이에요',
    color: '#B4D8FF',
  },
  8: {
    title: '5°C 미만인 날이에요',
    color: '#D4D0FD',
  },
};

export const MAN_TOP_COLTHES = [
  { name: '민소매', Clothes: 민소매 },
  { name: '반팔티', Clothes: 반팔티 },
  { name: '긴팔티', Clothes: 긴팔티 },
  { name: '후드티', Clothes: 후드티 },
  { name: '니트', Clothes: 니트 },
  { name: '트렌치코트', Clothes: 트렌치코트 },
  { name: '코트', Clothes: 코트 },
  { name: '패딩', Clothes: 패딩 },
];
