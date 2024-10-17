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

export const MAN_BOTTOM_CLOTHES = [
  { name: '반바지', Clothes: 반바지 },
  { name: '바지', Clothes: 바지 },
  { name: '청바지', Clothes: 청바지 },
  { name: '기모바지', Clothes: 기모바지 },
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
    top: '트렌치코트',
    bottom: '기모바지',
  },
  7: {
    top: '코트',
    bottom: '기모바지',
  },
  8: {
    top: '패딩',
    bottom: '기모바지',
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
