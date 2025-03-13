import { theme } from '@/shared/styles';

import { DraggingRangeStatus } from './types';

export const CLOCK_RADIUS = 164;
export const CLOCK_INNER_RADIUS = 144;

export const TIME_COLOR: Record<DraggingRangeStatus, string> = {
  currentDay: theme.colors.blueGrey[600],
  nextDay: theme.colors.info.main,
  impossible: theme.colors.error.main,
};
