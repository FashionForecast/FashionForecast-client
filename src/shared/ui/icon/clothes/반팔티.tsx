import { ClothesProps } from '@/shared/types/clothes';

const 반팔티 = ({ color = '#F8AF20' }: ClothesProps) => {
  return (
    <svg
      width='56'
      height='46'
      viewBox='0 0 56 46'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.99655 14.3851C1.69068 14.6603 1.51134 15.0492 1.50052 15.4606C1.4897 15.8719 1.64836 16.2697 1.93934 16.5607L10.5 25.1213V42.5C10.5 43.3284 11.1716 44 12 44H44C44.8284 44 45.5 43.3284 45.5 42.5V25.1213L54.0607 16.5607C54.3516 16.2697 54.5103 15.8719 54.4995 15.4606C54.4887 15.0492 54.3093 14.6603 54.0034 14.3851L44.0034 5.38506C43.864 5.25958 43.7023 5.16137 43.5267 5.09551L35.5267 2.09551C35.0573 1.91948 34.531 1.98959 34.124 2.28234C32.4005 3.52221 30.2877 4.2521 28 4.2521C25.7123 4.2521 23.5995 3.52221 21.876 2.28234C21.469 1.98959 20.9427 1.91948 20.4733 2.09551L12.4733 5.09551C12.2977 5.16137 12.136 5.25958 11.9966 5.38506L1.99655 14.3851Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path d='M12 13.5V42.5H44V13.5' stroke='#434D58' strokeWidth='2' />
      <path
        d='M12 24.5L3 15.5L13 6.5L21 3.5C22.9702 4.91733 25.3876 5.7521 28 5.7521C30.6124 5.7521 33.0298 4.91733 35 3.5L43 6.5L53 15.5L44 24.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M20 4C22.2284 5.88367 24.9984 7 28 7C31.0016 7 33.7716 5.88367 36 4'
        stroke='#434D58'
        strokeWidth='3'
      />
    </svg>
  );
};

export default 반팔티;
