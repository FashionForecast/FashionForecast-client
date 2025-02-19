import { ClothesProps } from '@/shared/types/clothes';

const 접이식우산 = ({ color = '#10D69E' }: ClothesProps) => {
  return (
    <svg
      width='41'
      height='41'
      viewBox='0 0 41 41'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.85355 28.9749L12.0251 38.1464C13.392 39.5133 15.608 39.5133 16.9749 38.1464L36.1464 18.9749C37.5133 17.608 37.5133 15.392 36.1464 14.0251L26.9749 4.85355C25.608 3.48672 23.392 3.48672 22.0251 4.85355L2.85355 24.0251C1.48672 25.392 1.48672 27.608 2.85355 28.9749Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M30.4393 5.43934C29.8536 6.02513 29.8536 6.97487 30.4393 7.56066L33.4393 10.5607C34.0251 11.1464 34.9749 11.1464 35.5607 10.5607L38.5607 7.56066C39.1464 6.97487 39.1464 6.02513 38.5607 5.43934L35.5607 2.43934C34.9749 1.85355 34.0251 1.85355 33.4393 2.43934L30.4393 5.43934Z'
        fill='#10D69E'
        stroke='#10D69E'
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path
        d='M13.0858 37.0858L3.91421 27.9142C3.13317 27.1332 3.13317 25.8668 3.91421 25.0858L23.0858 5.91421C23.8668 5.13317 25.1332 5.13317 25.9142 5.91421L35.0858 15.0858C35.8668 15.8668 35.8668 17.1332 35.0858 17.9142L15.9142 37.0858C15.1332 37.8668 13.8668 37.8668 13.0858 37.0858Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M34.5 9.5L31.5 6.5L34.5 3.5L37.5 6.5L34.5 9.5Z'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M13 37L12.9142 36.9142C12.1332 36.1332 12.1332 34.8668 12.9142 34.0858L19.5 27.5M35.5 15.5H33.1569C32.096 15.5 31.0786 15.9214 30.3284 16.6716L24.5 22.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path
        d='M13 37L6.91421 30.9142C6.13317 30.1332 6.13317 28.8668 6.91421 28.0858L13.5 21.5M35 15L30.3284 10.3284C28.7663 8.76633 26.2337 8.76633 24.6716 10.3284L18.5 16.5'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M10.5 18.5L22.5 30.5' stroke='#434D58' strokeWidth='2' />
      <path d='M30.5 10.5L32.5 8.5' stroke='#434D58' strokeWidth='3.5' />
      <path d='M15.5 13.5L27.5 25.5' stroke='#434D58' strokeWidth='2' />
    </svg>
  );
};

export default 접이식우산;
