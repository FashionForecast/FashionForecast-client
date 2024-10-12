import UserAvatar from '@/components/UserAvatar';
import { C } from './style';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';

const UserGenderHeader = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <C.AppBar position='relative'>
      <C.Paper>
        <C.Toolbar>
          <Link to={'/'}>
            <IconButton>
              <img src='/logo.svg' alt='로고 이미지' />
            </IconButton>
          </Link>

          <UserAvatar imageUrl={user?.imageUrl} />
        </C.Toolbar>
      </C.Paper>
    </C.AppBar>
  );
};

export default UserGenderHeader;
