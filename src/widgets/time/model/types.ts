export type DraggingRangeStatus = 'currentDay' | 'nextDay' | 'impossible';
export type Day = '오늘' | '내일' | '모레';

export type VisibleHoursText = {
  alwaysShowHours: number[];
  selectedBothEnds: number[];
};
