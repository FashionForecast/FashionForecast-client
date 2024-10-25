import { WeatherType } from '@/types/weather';
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

export const LOOKBOOK_WEATHER_TYPE: Record<
  WeatherType,
  { title: string; subtitle: string; color: string }
> = {
  1: {
    title: '28°C 이상',
    subtitle: '무더운 한여름 날씨, 가벼운 옷차림 필수!',
    color: '#FFC8C0',
  },
  2: {
    title: '23 - 28°C',
    subtitle: '따뜻한 초여름이나 늦여름 날씨, 활동하기 좋은 날!',
    color: '#FFCA98',
  },
  3: {
    title: '20 - 23°C',
    subtitle: '선선하고 쾌적한 봄가을 날씨, 외출하기 좋은 날!',
    color: '#F2D41B',
  },
  4: {
    title: '17 - 20°C',
    subtitle: '살짝 쌀쌀한 가을 날씨, 가벼운 겉옷 필요!',
    color: '#CAE02A',
  },
  5: {
    title: '12 - 17°C',
    subtitle: '점점 추워지는 초가을이나 늦가을 날씨, 겉옷 필수!',
    color: '#7FEB90',
  },
  6: {
    title: '9 - 12°C',
    subtitle: '찬바람이 부는 쌀쌀한 날씨, 따뜻하게 입기!',
    color: '#68E7E8',
  },
  7: {
    title: '5 - 9°C',
    subtitle: '초겨울 같은 추운 날씨, 꽁꽁 싸매고 나가기!',
    color: '#B4D8FF',
  },
  8: {
    title: '5°C 미만',
    subtitle: '매서운 한겨울 날씨, 방한을 철저히!',
    color: '#D4D0FD',
  },
};

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

export const DEFAULT_CLOTHES_BY_WEATHER = {
  1: {
    top: '민소매',
    bottom: '반바지',
  },
  2: {
    top: '반팔티',
    bottom: '바지',
  },
  3: {
    top: '긴팔티',
    bottom: '바지',
  },
  4: {
    top: '후드티',
    bottom: '청바지',
  },
  5: {
    top: '니트',
    bottom: '청바지',
  },
  6: {
    top: '트렌치 코트',
    bottom: '기모 바지',
  },
  7: {
    top: '코트',
    bottom: '기모 바지',
  },
  8: {
    top: '패딩',
    bottom: '기모 바지',
  },
};

export const ColorPalettes = [
  '#F9FAFB',
  '#EBEEF2',
  '#B2BECC',
  '#788DA3',
  '#53616F',
  '#323941',
  '#B32A2E',
  '#A14217',
  '#8E501A',
  '#7E5815',
  '#6D5F1B',
  '#5C641D',
  '#FD4649',
  '#ED5C18',
  '#CE7419',
  '#B88011',
  '#BCA51E',
  '#859222',
  '#FFA59B',
  '#FFA87E',
  '#FEAA5C',
  '#F8AF20',
  '#F2D41B',
  '#B3C725',
  '#FFE9E5',
  '#FFEADE',
  '#FFEAD6',
  '#FFEBCD',
  '#FFEF9B',
  '#EFF2B0',
  '#466929',
  '#2C6C39',
  '#206B51',
  '#21696A',
  '#22677D',
  '#226492',
  '#399E4F',
  '#209D75',
  '#219A9B',
  '#2096B9',
  '#1892D9',
  '#028CFD',
  '#84D046',
  '#45D769',
  '#10D69E',
  '#0FD2D3',
  '#02CDFE',
  '#80C3FF',
  '#DDF6C4',
  '#CFF8D2',
  '#C6F9E2',
  '#CAF6F6',
  '#D6F2FF',
  '#E2EFFF',
  '#4654C0',
  '#7947AC',
  '#A1347C',
  '#787FF6',
  '#AB6FE7',
  '#EB47BD',
  '#BAB5FB',
  '#D3AEF3',
  '#FB9FE1',
  '#EEECFE',
  '#F4EAFC',
  '#FFE7F9',
];
