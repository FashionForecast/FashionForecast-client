import { theme } from '@/shared/styles';

const TimeDivider = () => {
  return (
    <circle
      cx={'0'}
      cy={'0'}
      r={'144'}
      fill='none'
      stroke={theme.colors.blueGrey[400]}
      strokeWidth={20}
      pathLength={24}
      strokeDasharray={'0 1 0.05 0.95 0.05 0.95'}
    />
  );
};

export default TimeDivider;
