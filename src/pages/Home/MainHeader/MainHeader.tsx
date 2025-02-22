import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib';
import {
  Button,
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
    <Header
      leftSlot={
        <C.SearchLink to={'/search'}>
          <Button
            startIcon={geolocation?.isGPS && <LocationIcon />}
            endIcon={<TriangleIcon />}
            color='inherit'
          >
            {geolocation?.region}
          </Button>
        </C.SearchLink>
      }
      rightSlot={
        <Link to={user ? '/user' : '/login'}>
          <UserAvatar imageUrl={user?.imageUrl} />
        </Link>
      }
    />
  );
};

export default memo(MainHeader);
