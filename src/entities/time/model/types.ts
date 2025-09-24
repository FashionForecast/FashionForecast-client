export type Time = {
  startTime: string;
  endTime: string | null;
  ranges: number[];
  isNextDay?: boolean;
  isDefault?: boolean;
};
