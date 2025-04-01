import { theme } from '@/shared/styles';

type RecentSearchIconProps = {
  color?: 'primary' | 'white';
};

export const RecentSearchIcon = ({
  color = 'primary',
}: RecentSearchIconProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 21C9.7 21 7.69167 20.2417 5.975 18.725C4.275 17.1917 3.3 15.2833 3.05 13H5.1C5.33333 14.7333 6.1 16.1667 7.4 17.3C8.71667 18.4333 10.25 19 12 19C13.95 19 15.6 18.325 16.95 16.975C18.3167 15.6083 19 13.95 19 12C19 10.05 18.3167 8.4 16.95 7.05C15.6 5.68333 13.95 5 12 5C10.85 5 9.775 5.26667 8.775 5.8C7.775 6.33333 6.93333 7.06667 6.25 8H9V10H3V4H5V6.35C5.85 5.28333 6.88333 4.45833 8.1 3.875C9.33333 3.29167 10.6333 3 12 3C13.25 3 14.4167 3.24167 15.5 3.725C16.6 4.19167 17.55 4.83333 18.35 5.65C19.1667 6.45 19.8083 7.4 20.275 8.5C20.7583 9.58333 21 10.75 21 12C21 13.25 20.7583 14.425 20.275 15.525C19.8083 16.6083 19.1667 17.5583 18.35 18.375C17.55 19.175 16.6 19.8167 15.5 20.3C14.4167 20.7667 13.25 21 12 21ZM14.8 16.2L11 12.4V7H13V11.6L16.2 14.8L14.8 16.2Z'
        fill={getColor(color)}
      />
    </svg>
  );
};

function getColor(color: RecentSearchIconProps['color']) {
  if (color === 'white') return theme.colors.white;
  return theme.colors.text.primary;
}
