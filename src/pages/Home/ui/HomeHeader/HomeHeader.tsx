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
  const selectedRegion = useAppSelector((state) => state.region.selectedRegion);
  const member = useAppSelector((state) => state.member.info);

  return (
    <Header
      leftSlot={
        <Link to={'/search'}>
          <Button startIcon={<RegionIcon />} color='secondary'>
            {selectedRegion?.region}
          </Button>
        </Link>
      }
      rightSlot={
        <Link to={member ? '/user' : '/login'}>
          <IconButton variant='contained'>
            <UserAvatar />
          </IconButton>
        </Link>
      }
    />
  );
});
