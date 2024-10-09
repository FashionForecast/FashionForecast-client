import LocationIcon from '@/components/icon/Location';
import MenuItem from '../MenuItem';

const RegionSetMenu = () => {
  return (
    <MenuItem title='기본 위치' value='현재 위치' icon={<LocationIcon />} />
  );
};

export default RegionSetMenu;
