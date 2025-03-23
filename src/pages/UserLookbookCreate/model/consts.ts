import { BottomClothesName, TopClothesName } from '@/entities/clothes';
import { WeatherTypeName } from '@/entities/weather';

export const REPRESENTATIVE_CLOTHES_BY_WEATHER: Record<
  WeatherTypeName,
  { top: TopClothesName; bottom: BottomClothesName }
> = {
  sweltering: {
    top: '민소매',
    bottom: '반바지',
  },
  hot: {
    top: '반팔티',
    bottom: '슬랙스',
  },
  warm: {
    top: '긴팔티',
    bottom: '면바지',
  },
  moderate: {
    top: '후드티',
    bottom: '청바지',
  },
  cool: {
    top: '니트',
    bottom: '청바지',
  },
  chilly: {
    top: '트렌치 코트',
    bottom: '기모 바지',
  },
  cold: {
    top: '코트',
    bottom: '기모 바지',
  },
  frigid: {
    top: '패딩',
    bottom: '기모 바지',
  },
};
