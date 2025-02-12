import { IconButton } from '@mui/material';
import { C } from './MainHeader.style';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/LocationIcon';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import Header from '@/components/Header/Header';
import { memo } from 'react';
import TriangleIcon from '@/components/icon/TriangleIcon';

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

export default memo(MainHeader);
