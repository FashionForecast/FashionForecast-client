import { ClothesProps } from '@/types/clothes';

const 청바지 = ({ color = '#80C3FF' }: ClothesProps) => {
  return (
    <svg
      width='44'
      height='62'
      viewBox='0 0 44 62'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M42.4959 57.3892C42.5557 58.1963 41.9645 58.9052 41.1598 58.9915L27.1598 60.4915C26.3472 60.5785 25.6145 59.9991 25.5119 59.1884L22 31.4446L18.4881 59.1884C18.3855 59.9991 17.6528 60.5785 16.8402 60.4915L2.8402 58.9915C2.03553 58.9052 1.44432 58.1963 1.5041 57.3892L5.5041 3.38919C5.56212 2.6059 6.21456 2 7 2H37C37.7854 2 38.4379 2.6059 38.4959 3.38919L42.4959 57.3892Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M41 57.5L37 3.5H7L3 57.5L17 59L22 19.5L27 59L41 57.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M22 3.5V19.5' stroke='#434D58' strokeWidth='2' />
      <path
        d='M18 4V17C18 18.6569 19.3431 20 21 20H22'
        stroke='#434D58'
        strokeWidth='2'
        strokeDasharray='4 4'
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
      <path d='M41 53.5L27 55M3 53.5L17 55' stroke='#434D58' strokeWidth='2' />
      <path
        d='M7 17L4 58'
        stroke='#434D58'
        strokeWidth='2'
        strokeDasharray='4 4'
      />
      <path d='M7 17L7.25 13.5833' stroke='#434D58' strokeWidth='2' />
      <path
        d='M37 17L40 58'
        stroke='#434D58'
        strokeWidth='2'
        strokeDasharray='4 4'
      />
      <path d='M37 17L36.75 13.5833' stroke='#434D58' strokeWidth='2' />
    </svg>
  );
};

export default 청바지;
