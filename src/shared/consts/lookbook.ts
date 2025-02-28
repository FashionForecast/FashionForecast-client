import { WeatherTypeNumber } from '@/entities/weather';

export const LOOKBOOK_WEATHER_TYPE: Record<
  WeatherTypeNumber,
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
