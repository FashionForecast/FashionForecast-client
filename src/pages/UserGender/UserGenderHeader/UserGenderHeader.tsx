import { IconButton } from '@mui/material';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { Header, UserAvatar } from '@/shared/ui';

const UserGenderHeader = () => {
  const user = useAppSelector((state) => state.member.info);

  return (
    <Header>
      <IconButton disableRipple>
        <img src='/logo.svg' alt='로고 이미지' />
      </IconButton>

      <UserAvatar imageUrl={user?.imageUrl} />
    </Header>
  );
};

export default UserGenderHeader;
