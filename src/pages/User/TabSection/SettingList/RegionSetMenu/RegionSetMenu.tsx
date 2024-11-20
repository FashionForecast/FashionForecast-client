import LocationIcon from '@/components/icon/Location';
import MenuItem from '../components/MenuItem/MenuItem';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';

const RegionSetMenu = () => {
  const user = useAppSelector((state) => state.user.info);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search', {
      state: { mode: 'set' },
    });
  };

  return (
    <MenuItem
      title='기본 위치'
      value={user?.region === 'DEFAULT' ? '현재 위치' : user?.region}
      icon={<LocationIcon />}
      handleClick={handleClick}
    />
  );
};

export default RegionSetMenu;
