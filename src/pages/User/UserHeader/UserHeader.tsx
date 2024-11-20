import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CloseIcon from '@/components/icon/CloseIcon';
import Header from '@/components/Header/Header';

const UserHeader = () => {
  return (
    <Header>
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
    </Header>
  );
};

export default UserHeader;
