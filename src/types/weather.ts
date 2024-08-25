export type WeatherResponse = {
  data: {
    season: string;
    extremumTmp: number;
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
      rainType: string;
      skyStatus: string;
      nx: number;
      ny: number;
    }>
  
  };
  message: string;
  status: number;
};
