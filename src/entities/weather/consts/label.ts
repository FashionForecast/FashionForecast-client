import { WeatherTypeName } from '../model/types';

export const WEATHER_LABELS: Record<
  WeatherTypeName,
  { temperature: string; summary: string }
> = {
  sweltering: {
    temperature: '28°C 이상',
    summary: '무더운 한여름 날씨, 가벼운 옷차림 필수!',
  },
  hot: {
    temperature: '23 - 28°C',
    summary: '따뜻한 초여름이나 늦여름 날씨, 활동하기 좋은 날!',
  },
  warm: {
    temperature: '20 - 23°C',
    summary: '선선하고 쾌적한 봄가을 날씨, 외출하기 좋은 날!',
  },
  moderate: {
    temperature: '17 - 20°C',
    summary: '살짝 쌀쌀한 가을 날씨, 가벼운 겉옷 필요!',
  },
  cool: {
    temperature: '12 - 17°C',
    summary: '점점 추워지는 초가을이나 늦가을 날씨, 겉옷 필수!',
  },
  chilly: {
    temperature: '9 - 12°C',
    summary: '찬바람이 부는 쌀쌀한 날씨, 따뜻하게 입기!',
  },
  cold: {
    temperature: '5 - 9°C',
    summary: '초겨울 같은 추운 날씨, 꽁꽁 싸매고 나가기!',
  },
  frigid: {
    temperature: '5°C 미만',
    summary: '매서운 한겨울 날씨, 방한을 철저히!',
  },
};
