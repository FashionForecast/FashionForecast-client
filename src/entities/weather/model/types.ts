import { RainType, SkyStatus } from '@/shared/types';

export type WeatherDto = {
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
