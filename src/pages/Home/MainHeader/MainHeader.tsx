import { IconButton } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib';
import {
  CustomButton,
  LocationIcon,
  UserAvatar,
  Header,
  TriangleIcon,
} from '@/shared/ui';

import { C } from './MainHeader.style';

const MainHeader = () => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const user = useAppSelector((state) => state.member.info);

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
