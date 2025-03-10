import { CLOCK_INNER_RADIUS } from '@/widgets/time/model/consts';

import { theme } from '@/shared/styles';

export const HourHand = () => {
  return (
    <circle
      r={CLOCK_INNER_RADIUS}
      fill='none'
      stroke={theme.colors.blueGrey[400]}
      strokeWidth={20}
      pathLength={24}
      strokeDasharray={'0 1 0.05 0.95 0.05 0.95'}
    />
  );
};
