import MenuItem from '../MenuItem';
import TshirtIcon from '@/assets/svg/tshirt.svg?react';

const ThicknessSetMenu = () => {
  return (
    <MenuItem title='기본 옷차림 두께' value='적당하게' icon={<TshirtIcon />} />
  );
};

export default ThicknessSetMenu;
