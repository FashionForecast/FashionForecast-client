import { ClothesIconNames } from '@/entities/clothes';
import { WeatherTypeName } from '@/entities/weather';

import { OutfitType } from './types';

export const CLOTHES_THUMBNAIL: Record<
  WeatherTypeName,
  Record<Extract<OutfitType, 'TOP' | 'BOTTOM'>, ClothesIconNames>
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
