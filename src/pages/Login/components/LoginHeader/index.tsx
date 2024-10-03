import CloseIcon from '@/components/icon/CloseIcon';
import { C } from './style';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
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

export default LoginHeader;
