import { ClothesProps } from '@/types/clothes';

const 긴치마 = ({ color = '#80C3FF' }: ClothesProps) => {
  return (
    <svg
      width='52'
      height='62'
      viewBox='0 0 52 62'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.52127 55.2483C1.39139 56.0113 1.86341 56.7479 2.61093 56.9487C10.0906 58.9575 17.9284 60 26 60C34.0716 60 41.9094 58.9575 49.3891 56.9487C50.1366 56.7479 50.6086 56.0113 50.4787 55.2483L42.5 8.37324V3.5C42.5 2.67157 41.8284 2 41 2H11C10.1716 2 9.5 2.67157 9.5 3.5V8.37325L1.52127 55.2483Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M3 55.5L11 8.5V3.5H41V8.5L49 55.5C41.6488 57.4743 33.9419 58.5 26 58.5C18.0581 58.5 10.3512 57.4743 3 55.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M3 54.6992C10.3512 56.6735 18.0581 57.6992 26 57.6992C33.9419 57.6992 41.6488 56.6735 49 54.6992'
        stroke='#434D58'
        strokeWidth='3.5'
      />
      <path d='M16 8.5L14 24.5H15L16 8.5Z' stroke='#434D58' strokeWidth='2' />
      <path
        d='M26 8.5L25.5 24.5H26.5L26 8.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M36 8.5L38 24.5H37L36 8.5Z' stroke='#434D58' strokeWidth='2' />
      <path d='M11 8.5H41' stroke='#434D58' strokeWidth='2' />
    </svg>
  );
};

export default 긴치마;
