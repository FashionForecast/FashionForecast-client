import { theme } from '@/shared/styles';

type CloseIconProps = {
  color?: 'gray' | 'black';
};

export const XIcon = ({ color = 'gray' }: CloseIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
        fill={getColor(color)}
      />
    </svg>
  );
};

function getColor(color: CloseIconProps['color']) {
  if (color === 'black') return theme.colors.text.primary;
  return theme.colors.blueGrey.A56;
}
