import { BottomClothesName, TopClothesName } from '@/entities/clothes';
import { WeatherTypeName } from '@/entities/weather';

import { OutfitType } from './types';

export const SHOWCASE_HEIGHT = '278px';
export const DRAGGABLE_AREA_HEIGHT = '58px';
export const SELECT_CLOTHES_BUTTON_WRAP_HEIGHT = '64px';

export const CLOTHES_THUMBNAIL: Record<
  WeatherTypeName,
  {
    [K in Extract<OutfitType, 'TOP' | 'BOTTOM'>]: K extends 'TOP'
      ? TopClothesName
      : BottomClothesName;
  }
> = {
  sweltering: {
    TOP: '민소매',
    BOTTOM: '반바지',
  },
  hot: {
    TOP: '반팔티',
    BOTTOM: '슬랙스',
  },
  warm: {
    TOP: '긴팔티',
    BOTTOM: '면바지',
  },
  moderate: {
    TOP: '후드티',
    BOTTOM: '청바지',
  },
  cool: {
    TOP: '니트',
    BOTTOM: '청바지',
  },
  chilly: {
    TOP: '트렌치 코트',
    BOTTOM: '기모 바지',
  },
  cold: {
    TOP: '코트',
    BOTTOM: '기모 바지',
  },
  frigid: {
    TOP: '패딩',
    BOTTOM: '기모 바지',
  },
};

export const MAN_TOP_CLOTHES: TopClothesName[] = [
  '민소매',
  '반팔티',
  '반팔 폴로티',
  '반팔 셔츠',
  '긴팔티',
  '긴팔 폴로티',
  '긴팔 셔츠',
  '맨투맨',
  '후드티',
  '니트',
  '재킷',
  '블레이저',
  '트렌치 코트',
  '코트',
  '야전상의',
  '패딩',
];

export const MAN_BOTTOM_CLOTHES: BottomClothesName[] = [
  '반바지',
  '면바지',
  '슬랙스',
  '청바지',
  '트레이닝 바지',
  '기모 바지',
];

export const WOMAN_BOTTOM_CLOTHES: BottomClothesName[] = [
  '반바지',
  '치마',
  '면바지',
  '슬랙스',
  '청바지',
  '트레이닝 바지',
  '스커트 스타킹',
  '긴치마',
  '기모 바지',
  '스커트 레깅스',
];
