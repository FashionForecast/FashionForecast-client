import { theme } from '@/styles/theme';

type CheckIconProps = {
  color?: 'default' | 'white' | 'disabled';
};

const CheckIcon = ({ color = 'default' }: CheckIconProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.79508 15.875L4.62508 11.705L3.20508 13.115L8.79508 18.705L20.7951 6.70504L19.3851 5.29504L8.79508 15.875Z'
        fill={getColor(color)}
      />
    </svg>
  );
};

export default CheckIcon;

function getColor(color: CheckIconProps['color']) {
  if (color === 'white') return theme.colors.white;
  if (color === 'disabled') return theme.colors.action.disabled;
  return theme.colors.action.active;
}
