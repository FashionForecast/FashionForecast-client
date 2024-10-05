import { Link } from 'react-router-dom';
import { C } from './style';
import { IconButton } from '@mui/material';
import CloseIcon from '@/components/icon/CloseIcon';

const UserHeader = () => {
  return (
    <C.AppBar position='relative'>
      <C.Paper>
        <C.Toolbar>
          <Link to={'/'}>
            <IconButton>
              <img src='/logo.svg' alt='로고 이미지' />
            </IconButton>
          </Link>

          <Link to={'/'}>
            <IconButton>
              <CloseIcon color='black' />
            </IconButton>
          </Link>
        </C.Toolbar>
      </C.Paper>
    </C.AppBar>
  );
};

export default UserHeader;
