export type Time = {
  startTime: string;
  endTime: string | null;
  ranges: number[];
  isTomorrow?: boolean;
  isDefault?: boolean;
};
export type DraggingRangeStatus = 'today' | 'tomorrow' | 'error';
export type Day = '오늘' | '내일' | '모레';
export type TimeSelectorDayButton = {
  type: Day;
  text: string;
}[];
