import { theme } from '@/shared/styles';

import { DraggingRangeStatus, TimeSelectorDayButton } from './types';

export const CLOCK_RADIUS = 164;
export const CLOCK_INNER_RADIUS = 144;

export const TIME_COLOR: Record<DraggingRangeStatus, string> = {
  currentDay: theme.colors.blueGrey[600],
  nextDay: theme.colors.info.main,
  impossible: theme.colors.error.main,
};

export const DAY_BUTTONS: TimeSelectorDayButton = [
  { type: '오늘', text: '오늘' },
  { type: '내일', text: '내일' },
  { type: '모레', text: '모레' },
];
