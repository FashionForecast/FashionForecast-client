import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { LocationIcon } from '@/shared/ui';

import MenuItem from '../components/MenuItem/MenuItem';

const RegionSetMenu = () => {
  const user = useAppSelector((state) => state.member.info);
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
