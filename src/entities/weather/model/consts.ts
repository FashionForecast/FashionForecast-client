import { theme } from '@/shared/styles';

import { WeatherTypeName, WeatherTypeNumber } from './types';

export const WEATHER_COLORS: Record<
  WeatherTypeName,
  { light: string; main: string; deep: string }
> = {
  sweltering: {
    light: theme.colors.red[100],
    main: theme.colors.red[200],
    deep: theme.colors.red[700],
  },
  hot: {
    light: theme.colors.orange[100],
    main: theme.colors.orange[200],
    deep: theme.colors.orange[700],
  },
  warm: {
    light: theme.colors.yellow[100],
    main: theme.colors.yellow[200],
    deep: theme.colors.yellow[700],
  },
  moderate: {
    light: theme.colors.lime[100],
    main: theme.colors.lime[200],
    deep: theme.colors.lime[700],
  },
  cool: {
    light: theme.colors.green[100],
    main: theme.colors.green[200],
    deep: theme.colors.green[700],
  },
  chilly: {
    light: theme.colors.cyan[100],
    main: theme.colors.cyan[200],
    deep: theme.colors.cyan[700],
  },
  cold: {
    light: theme.colors.blue[100],
    main: theme.colors.blue[200],
    deep: theme.colors.blue[700],
  },
  frigid: {
    light: theme.colors.deepPurple[100],
    main: theme.colors.deepPurple[200],
    deep: theme.colors.deepPurple[700],
  },
};

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

export const WEATHER_TYPE_NAME_MAP = {
  /** 28도 이상 */
  sweltering: '1',

  /**  23도 이상 - 28도 미만 */
  hot: '2',

  /**  20도 이상 - 23도 미만 */
  warm: '3',

  /**  17도 이상 - 20도 미만 */
  moderate: '4',

  /**  12도 이상 - 17도 미만 */
  cool: '5',

  /**  9도 이상 - 12도 미만 */
  chilly: '6',

  /**  5도 이상 - 9도 미만 */
  cold: '7',

  /**  5도 미만 */
  frigid: '8',
} as const;

/**
 * '1': 'sweltering',
 * '2': 'hot',
 * ...
 * '8': 'frigid'
 */
export const WEATHER_TYPE_NUMBER_MAP = Object.fromEntries(
  Object.entries(WEATHER_TYPE_NAME_MAP).map(([key, value]) => [value, key])
) as Record<WeatherTypeNumber, WeatherTypeName>;

export const WEATHER_TYPE = {
  nameToNumber: WEATHER_TYPE_NAME_MAP,
  numberToName: WEATHER_TYPE_NUMBER_MAP,
};
