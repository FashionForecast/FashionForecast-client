import { ClothesSVGProps } from '@/entities/clothes/model/types';

const 반바지 = ({
  color = '#F8AF20',
  outlineColor = '#434D58',
}: ClothesSVGProps) => {
  return (
    <svg
      width='42'
      height='40'
      viewBox='0 0 42 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M38.991 3.21C38.841 1.67 37.551 0.5 36.001 0.5H6.00095C4.46095 0.5 3.16095 1.67 3.01095 3.21L0.0109522 34.21C-0.149048 35.82 1.00095 37.26 2.60095 37.47L17.601 39.47C19.211 39.68 20.671 38.6 20.951 37.02L21.001 36.76L21.051 37.02C21.311 38.47 22.571 39.5 24.001 39.5C24.131 39.5 24.271 39.5 24.401 39.47L39.401 37.47C41.001 37.26 42.151 35.81 41.991 34.21L38.991 3.21Z'
        fill={color}
      />
      <path
        d='M36.9102 2.5H5.09016L1.91016 35.36L18.8202 37.61L21.0002 25.25L23.1802 37.61L40.0902 35.36L36.9102 2.5ZM20.0002 18.5C18.9002 18.5 18.0002 17.6 18.0002 16.5V9.5H20.0002V18.5ZM18.0002 7.5V4.5H20.0002V7.5H18.0002ZM16.0002 7.5H12.0002V4.5H16.0002V7.5ZM22.0002 4.5H30.0002V7.5H22.0002V4.5ZM35.9602 13.47C34.5202 12.38 33.3102 11.03 32.3402 9.5H35.5702L35.9502 13.47H35.9602ZM35.3802 7.5H32.0002V4.5H35.0902L35.3802 7.5ZM10.0002 4.5V7.5H6.62016L6.91016 4.5H10.0002ZM9.66016 9.5C8.69016 11.03 7.48016 12.38 6.04016 13.47L6.42016 9.5H9.65016H9.66016ZM17.5302 33.41L4.28016 31.64L5.79016 16.04C8.33016 14.5 10.4302 12.34 11.8702 9.74L12.0002 9.51L16.0002 9.5V16.5C16.0002 18.64 17.6902 20.38 19.8102 20.48L17.5302 33.41ZM22.0002 19.41V9.5H30.0002L30.1302 9.74C31.5702 12.34 33.6702 14.51 36.2102 16.04L37.7202 31.64L24.4702 33.41L22.0002 19.41Z'
        fill={outlineColor}
      />
    </svg>
  );
};

export default 반바지;
