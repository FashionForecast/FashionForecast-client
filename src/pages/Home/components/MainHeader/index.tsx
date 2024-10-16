import TriangleIcon from '@/assets/svg/triangle.svg?react';
import { IconButton } from '@mui/material';
import { C } from './style';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/Location';
import { Link } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';
import UserAvatar from '@/components/UserAvatar';
import Header from '@/components/Header';

const MainHeader = () => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const user = useAppSelector((state) => state.user.info);

  return (
    <Header>
      <IconButton>
        <img src='/logo.svg' alt='로고 이미지' />
      </IconButton>

      <C.SearchLink to={'/search'}>
        <CustomButton
          startIcon={geolocation?.isGPS && <LocationIcon />}
          endIcon={<TriangleIcon />}
          color='inherit'
          fullWidth
        >
          {geolocation?.region}
        </CustomButton>
      </C.SearchLink>

      <Link to={user ? '/user' : '/login'}>
        <UserAvatar imageUrl={user?.imageUrl} />
      </Link>
    </Header>
  );
};

export default MainHeader;
