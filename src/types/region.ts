export type Region = {
  region: string;
  nx: number;
  ny: number;
};

export type UserCurrentRegion = Region & {
  isGPS?: boolean;
};
