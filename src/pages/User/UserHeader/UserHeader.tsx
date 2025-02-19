import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import { XIcon, Header } from '@/shared/ui';

const UserHeader = () => {
  return (
    <Header
      leftSlot={
        <Link to={'/'}>
          <IconButton>
            <img src='/logo.svg' alt='로고 이미지' />
          </IconButton>
        </Link>
      }
      rightSlot={
        <Link to={'/'}>
          <IconButton>
            <XIcon color='black' />
          </IconButton>
        </Link>
      }
    ></Header>
  );
};

export default UserHeader;
