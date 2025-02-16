import { ClothesProps } from '@/shared/types/clothes';

const 치마 = ({ color = '#80C3FF' }: ClothesProps) => {
  return (
    <svg
      width='46'
      height='40'
      viewBox='0 0 46 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.52803 33.7114C1.37516 34.491 1.85671 35.2546 2.62611 35.4527C9.14248 37.1298 15.9698 38 23 38C30.0302 38 36.8575 37.1298 43.3739 35.4527C44.1433 35.2546 44.6248 34.491 44.472 33.7114L39.5 8.35433V3.5C39.5 2.67157 38.8284 2 38 2H8C7.17157 2 6.5 2.67157 6.5 3.5V8.35433L1.52803 33.7114Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M8 34.5L3 34L8 8.5H13L8 34.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M16 35.5L9 35L13 8.5H18.5L16 35.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M38 34.5L43 34L38 8.5H33L38 34.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M30 35.5L37 35L33 8.5H27.5L30 35.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M29 36H17L18.5 8.5H27.5L29 36Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M8 8.5V3.5H38V8.5' stroke='#434D58' strokeWidth='2' />
    </svg>
  );
};

export default 치마;
