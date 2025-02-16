export type Time = {
  startTime: string;
  endTime: string | null;
  indexes: number[];
  isTomorrow?: boolean;
  isDefault?: boolean;
};
export type DragRangeStatus = 'today' | 'tommorow' | 'error';
export type DayButtonType = '오늘' | '내일' | '모레';
export type TimeSelectorDayButton = {
  type: DayButtonType;
  text: string;
}[];
