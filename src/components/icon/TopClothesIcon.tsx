type IconProps = {
  color?: string;
};

const TopClothesIcon = ({ color = '#0000008F' }: IconProps) => {
  return (
    <svg
      width='22'
      height='19'
      viewBox='0 0 22 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 8.45L3.125 9.475L0.15 4.275L6.75 0.499999H9V1.5C9 2.05 9.19167 2.525 9.575 2.925C9.975 3.30833 10.45 3.5 11 3.5C11.55 3.5 12.0167 3.30833 12.4 2.925C12.8 2.525 13 2.05 13 1.5V0.499999H15.25L21.85 4.275L18.9 9.425L17 8.475V18.5H5V8.45Z'
        fill={color}
      />
    </svg>
  );
};

export default TopClothesIcon;
