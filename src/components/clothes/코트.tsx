import { ClothesProps } from '@/types/clothes';

const 코트 = ({ color = '#F8AF20' }: ClothesProps) => {
  return (
    <svg
      width='52'
      height='62'
      viewBox='0 0 52 62'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M33.0607 1.93934C32.7794 1.65804 32.3978 1.5 32 1.5H20C19.6022 1.5 19.2206 1.65804 18.9393 1.93934L15.2331 5.64555L10.2087 6.90165C8.06474 7.43765 6.44979 9.20487 6.10862 11.3884L1.51798 40.7684C1.40111 41.5164 1.85996 42.2343 2.58792 42.4423L8.5 44.1315V59C8.5 59.8284 9.17157 60.5 10 60.5H42C42.8284 60.5 43.5 59.8284 43.5 59V44.1315L49.4121 42.4423C50.14 42.2343 50.5989 41.5164 50.482 40.7684L45.8914 11.3884C45.5502 9.20487 43.9353 7.43765 41.7913 6.90165L36.7669 5.64555L33.0607 1.93934Z'
        fill={color}
        stroke={color}
        strokeWidth='3'
        strokeLinejoin='round'
      />
      <path d='M10 9V59H42V9' stroke='#434D58' strokeWidth='2' />
      <path
        d='M42 43L49 41L44.4094 11.6199C44.1612 10.0319 42.9867 8.74668 41.4275 8.35686L36 7L32 3H20L16 7L10.5725 8.35686C9.01327 8.74668 7.83876 10.0319 7.59064 11.6199L3 41L10 43'
        stroke='#434D58'
        strokeWidth='2'
      />
      <path d='M20 3L26 11L21 15L16 7' stroke='#434D58' strokeWidth='2' />
      <path d='M32 3L26 11L31 15L36 7' stroke='#434D58' strokeWidth='2' />
      <path d='M49 40L42 42' stroke='#434D58' strokeWidth='2' />
      <path d='M3 40L10 42' stroke='#434D58' strokeWidth='2' />
      <path d='M26 12L26 59' stroke='#434D58' strokeWidth='3.5' />
      <path d='M10 47L16 35' stroke='#434D58' strokeWidth='2' />
      <path d='M42 47L36 35' stroke='#434D58' strokeWidth='2' />
    </svg>
  );
};

export default 코트;
