import XIcon from '@/components/icon/XIcon';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';

const LoginHeader = () => {
  return (
    <Header>
      <Link to={'/'}>
        <IconButton>
          <img src='/logo.svg' alt='로고 이미지' />
        </IconButton>
      </Link>

      <Link to={'/'}>
        <IconButton>
          <XIcon color='black' />
        </IconButton>
      </Link>
    </Header>
  );
};

export default LoginHeader;
