export type WeatherResponse = {
  data: {
    fcstDate: string;
    fcstTime: string;
    tmp: string;
    reh: string;
    wsd: string;
    pop: string;
    pcp: string;
    rainType: string;
    skyStatus: string;
    nx: number;
    ny: number;
  }[];
  message: string;
  status: number;
};
