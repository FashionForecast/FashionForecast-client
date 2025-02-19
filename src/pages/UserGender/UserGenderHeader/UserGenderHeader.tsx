import { IconButton } from '@mui/material';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { Header, UserAvatar } from '@/shared/ui';

const UserGenderHeader = () => {
  const user = useAppSelector((state) => state.member.info);

  return (
    <Header
      leftSlot={
        <IconButton disableRipple>
          <img src='/logo.svg' alt='로고 이미지' />
        </IconButton>
      }
      rightSlot={<UserAvatar imageUrl={user?.imageUrl} />}
    />
  );
};

export default UserGenderHeader;
