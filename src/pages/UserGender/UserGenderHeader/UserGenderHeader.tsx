import { IconButton } from '@mui/material';

import { Header, UserAvatar } from '@/shared/ui';

const UserGenderHeader = () => {
  return (
    <Header
      leftSlot={
        <IconButton disableRipple>
          <img src='/logo.svg' alt='로고 이미지' />
        </IconButton>
      }
      rightSlot={<UserAvatar />}
    />
  );
};

export default UserGenderHeader;
