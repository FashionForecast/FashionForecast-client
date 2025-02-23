import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib';
import {
  Button,
  UserAvatar,
  Header,
  RegionIcon,
  IconButton,
} from '@/shared/ui';

export const HomeHeader = memo(() => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const member = useAppSelector((state) => state.member.info);

  return (
    <Header
      leftSlot={
        <Link to={'/search'}>
          <Button startIcon={<RegionIcon />} color='secondary'>
            {geolocation?.region}
          </Button>
        </Link>
      }
      rightSlot={
        <Link to={member ? '/user' : '/login'}>
          <IconButton variant='contained' size='small'>
            <UserAvatar />
          </IconButton>
        </Link>
      }
    />
  );
});
