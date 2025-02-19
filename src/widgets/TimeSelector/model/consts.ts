import { theme } from '@/shared/styles';

import { DragRangeStatus, TimeSelectorDayButton } from './types';

export const TIME_COLOR: Record<DragRangeStatus, string> = {
  today: theme.colors.blueGrey[600],
  tommorow: theme.colors.info.main,
  error: theme.colors.error.main,
};

export const DAY_BUTTONS: TimeSelectorDayButton = [
  { type: '오늘', text: '오늘' },
  { type: '내일', text: '내일' },
  { type: '모레', text: '모레' },
];
