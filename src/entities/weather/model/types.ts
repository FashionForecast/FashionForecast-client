import { WEATHER_TYPE_NAME_MAP } from './consts';

export type WeatherTypeName = keyof typeof WEATHER_TYPE_NAME_MAP;
export type WeatherTypeNumber = (typeof WEATHER_TYPE_NAME_MAP)[WeatherTypeName];

export type RainType =
  | 'NONE'
  | 'RAIN'
  | 'RAIN_AND_SNOW'
  | 'SNOW'
  | 'SHOWER'
  | 'RAIN_DROP'
  | 'RAIN_AND_SNOW_FLURRIES'
  | 'SNOW_FLURRIES';

export type SkyStatus = 'CLEAR' | 'PARTLY_CLOUDY' | 'CLOUDY';

export type TemperatureCondition = 'COOL' | 'NORMAL' | 'WARM';

export type WeatherDto = {
  season: string;
  extremumTmp: number;
  maxMinTmpDiff: number;
  maximumPop: number;
  maximumPcp: number;
  forecasts: Array<Forecast>;
};

export type Forecast = {
  fcstDate: string;
  fcstTime: string;
  isSelected: boolean;
  tmp: number;
  reh: number;
  wsd: number;
  pop: number;
  pcp: number;
  rainType: RainType;
  skyStatus: SkyStatus;
  nx: number;
  ny: number;
};
