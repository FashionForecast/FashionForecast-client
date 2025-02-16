import { ClothesProps } from '@/shared/types/clothes';

const 바지 = ({ color = '#80C3FF' }: ClothesProps) => {
  return (
    <svg
      width='44'
      height='62'
      viewBox='0 0 44 62'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M42.4959 57.3892C42.5567 58.21 41.9448 58.9265 41.1246 58.9948L29.1246 59.9948C28.3536 60.0591 27.6603 59.5265 27.5236 58.765L22 27.9907L16.4764 58.765C16.3397 59.5265 15.6464 60.0591 14.8754 59.9948L2.87543 58.9948C2.05523 58.9265 1.4433 58.21 1.5041 57.3892L5.5041 3.38919C5.56212 2.6059 6.21456 2 7 2H37C37.7854 2 38.4379 2.6059 38.4959 3.38919L42.4959 57.3892Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M41 57.5L37 3.5H7L3 57.5L15 58.5L22 19.5L29 58.5L41 57.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M22 3.5V19.5' stroke='#434D58' strokeWidth='2' />
      <path
        d='M18 3.5V16.5C18 18.1569 19.3431 19.5 21 19.5H22'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M6 15.5C8.38323 13.9276 10.4276 11.8832 12 9.5V3.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M38 15.5C35.6168 13.9276 33.5724 11.8832 32 9.5V3.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M6 8.5L38 8.5' stroke='#434D58' strokeWidth='2' />
      <path
        d='M41 56.5L29 57.5M3 56.5L15 57.5'
        stroke='#434D58'
        strokeWidth='2'
      />
    </svg>
  );
};

export default 바지;
