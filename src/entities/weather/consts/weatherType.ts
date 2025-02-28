import { WeatherTypeName, WeatherTypeNumber } from '../model/types';

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
