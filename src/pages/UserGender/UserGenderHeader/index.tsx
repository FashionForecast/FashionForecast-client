import { C } from './style';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const UserGenderHeader = () => {
  return (
    <C.AppBar position='relative'>
      <C.Paper>
        <C.Toolbar>
          <Link to={'/'}>
            <IconButton>
              <img src='/logo.svg' alt='로고 이미지' />
            </IconButton>
          </Link>

          <C.Avatar alt='Avatar' variant='circular' src='/logo.svg' />
        </C.Toolbar>
      </C.Paper>
    </C.AppBar>
  );
};

export default UserGenderHeader;
