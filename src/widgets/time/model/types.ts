export type Time = {
  startTime: string;
  endTime: string | null;
  ranges: number[];
  isNextDay?: boolean;
  isDefault?: boolean;
};
export type DraggingRangeStatus = 'currentDay' | 'nextDay' | 'impossible';
export type Day = '오늘' | '내일' | '모레';
export type TimeSelectorDayButton = {
  type: Day;
  text: string;
}[];

export type VisibleHoursText = {
  alwaysShowHours: number[];
  selectedBothEnds: number[];
};
