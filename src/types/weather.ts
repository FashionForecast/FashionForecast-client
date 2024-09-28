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

export type WeatherResponseData = {
  season: string;
  extremumTmp: number;
  maxMinTmpDiff: number;
  maximumPop: number;
  maximumPcp: number;
  forecasts: Array<{
    fcstDate: string;
    fcstTime: string;
    tmp: number;
    reh: number;
    wsd: number;
    pop: number;
    pcp: number;
    rainType: RainType;
    skyStatus: SkyStatus;
    nx: number;
    ny: number;
  }>;
};
