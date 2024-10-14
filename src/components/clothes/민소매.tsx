import { ClothesProps } from '@/types/clothes';

const 민소매 = ({ color = '#F8AF20' }: ClothesProps) => {
  return (
    <svg
      width='38'
      height='46'
      viewBox='0 0 38 46'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.5 42.5C1.5 43.3284 2.17157 44 3 44H35C35.8284 44 36.5 43.3284 36.5 42.5V20.5C36.5 20.3581 36.4799 20.217 36.4402 20.0808C35.1855 15.7704 34.5 11.2136 34.5 6.5V6C34.5 5.36608 34.1015 4.8006 33.5045 4.58739L26.5045 2.08739C26.0403 1.92159 25.5242 1.99447 25.124 2.28234C23.4005 3.52221 21.2877 4.2521 19 4.2521C16.7123 4.2521 14.5995 3.52221 12.876 2.28234C12.4758 1.99447 11.9597 1.92159 11.4955 2.08739L4.49551 4.58739C3.89852 4.8006 3.50001 5.36608 3.50001 6V6.5C3.50001 11.2136 2.81448 15.7704 1.55978 20.0808C1.52013 20.217 1.5 20.3581 1.5 20.5V42.5Z'
        fill={color}
        stroke={color}
        stroke-width='3'
        stroke-linejoin='round'
      />
      <path
        d='M3 42.5V20.5C4.29314 16.0576 5.00001 11.3598 5.00001 6.5V6L12 3.5C13.9702 4.91733 16.3876 5.7521 19 5.7521C21.6124 5.7521 24.0298 4.91733 26 3.5L33 6V6.5C33 11.3598 33.7069 16.0576 35 20.5V42.5H3Z'
        stroke='#434D58'
        stroke-width='2'
      />
      <path
        d='M11 4.5C13.2284 6.38367 15.9984 7.5 19 7.5C22.0016 7.5 24.7716 6.38367 27 4.5'
        stroke='#434D58'
        stroke-width='2'
        stroke-linecap='square'
      />
    </svg>
  );
};

export default 민소매;
