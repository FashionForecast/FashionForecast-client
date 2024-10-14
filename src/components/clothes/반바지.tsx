import { ClothesProps } from '@/types/clothes';

const 반바지 = ({ color = '#80C3FF' }: ClothesProps) => {
  return (
    <svg
      width='42'
      height='40'
      viewBox='0 0 42 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M40.493 34.3555C40.5708 35.1591 39.9985 35.8801 39.1982 35.9868L24.1982 37.9868C23.4014 38.0931 22.6625 37.5523 22.5228 36.7607L21 28.1313L19.4772 36.7607C19.3375 37.5523 18.5986 38.0931 17.8018 37.9868L2.80175 35.9868C2.00146 35.8801 1.42921 35.1591 1.50697 34.3555L4.50697 3.35551C4.58138 2.58664 5.22754 2 6 2H36C36.7725 2 37.4186 2.58664 37.493 3.35551L40.493 34.3555Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M39 34.5L36 3.5H6L3 34.5L18 36.5L21 19.5L24 36.5L39 34.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M21 3.5V19.5' stroke='#434D58' strokeWidth='2' />
      <path
        d='M17 3.5V16.5C17 18.1569 18.3431 19.5 20 19.5H21'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M5 15.5C7.38323 13.9276 9.4276 11.8832 11 9.5V3.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M37 15.5C34.6168 13.9276 32.5724 11.8832 31 9.5V3.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M5 8.5L37 8.5' stroke='#434D58' strokeWidth='2' />
      <path
        d='M39 33.5L24 35.5M3 33.5L18 35.5'
        stroke='#434D58'
        strokeWidth='2'
      />
    </svg>
  );
};

export default 반바지;
