import { memo } from 'react';
import { Link } from 'react-router-dom';

import { MemberAvatar } from '@/entities/member/ui/MemberAvatar/MemberAvatar';

import { useAppSelector } from '@/shared/lib';
import { Button, Header, RegionIcon, IconButton } from '@/shared/ui';

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
            <MemberAvatar />
          </IconButton>
        </Link>
      }
    />
  );
});
