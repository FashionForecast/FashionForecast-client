import { theme } from '@/shared/styles';

type RegionIconProps = {
  color?: 'primary' | 'white';
};

export const RegionIcon = ({ color = 'primary' }: RegionIconProps) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.77083 14L5.66667 8.33333L1.19209e-07 6.22917V5.5L14 -4.76837e-07L8.5 14H7.77083Z'
        fill={getColor(color)}
      />
    </svg>
  );
};

function getColor(color: RegionIconProps['color']) {
  if (color === 'white') return theme.colors.white;
  return theme.colors.text.primary;
}
