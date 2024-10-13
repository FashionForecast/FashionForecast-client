import UserAvatar from '@/components/UserAvatar';
import { C } from './style';
import { IconButton } from '@mui/material';
import useAppSelector from '@/hooks/useAppSelector';

const UserGenderHeader = () => {
  const user = useAppSelector((state) => state.user.info);

  return (
    <C.AppBar position='relative'>
      <C.Paper>
        <C.Toolbar>
          <IconButton disableRipple>
            <img src='/logo.svg' alt='로고 이미지' />
          </IconButton>

          <UserAvatar imageUrl={user?.imageUrl} />
        </C.Toolbar>
      </C.Paper>
    </C.AppBar>
  );
};

export default UserGenderHeader;
