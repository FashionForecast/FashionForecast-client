import { WeatherType } from '@/types/weather';

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
