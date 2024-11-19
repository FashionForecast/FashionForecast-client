import UserAvatar from '@/components/UserAvatar';
import { IconButton } from '@mui/material';
import useAppSelector from '@/hooks/useAppSelector';
import Header from '@/components/Header';

const UserGenderHeader = () => {
  const user = useAppSelector((state) => state.user.info);

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
