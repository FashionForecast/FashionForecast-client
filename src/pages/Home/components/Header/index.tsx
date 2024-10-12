import AccountIcon from '@/assets/svg/account.svg?react';
import TriangleIcon from '@/assets/svg/triangle.svg?react';
import { IconButton } from '@mui/material';
import { C } from './style';
import CustomToolbar from '@/components/CustomMui/CustomToolbar';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/Location';
import { Link } from 'react-router-dom';
import useAppSelector from '@/hooks/useAppSelector';

const Header = () => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const user = useAppSelector((state) => state.user.user);

  return (
    <C.AppBar position='relative'>
      <C.Paper>
        <CustomToolbar>
          <IconButton>
            <img src='/logo.svg' alt='로고 이미지' />
          </IconButton>

          <C.SearchLink to={'/search'}>
            <CustomButton
              startIcon={geolocation?.isGPS && <LocationIcon />}
              endIcon={<TriangleIcon />}
              color='inherit'
              fullWidth
            >
              {geolocation?.region}
            </CustomButton>
          </C.SearchLink>

          <Link to={user ? '/user' : '/login'}>
            <IconButton>
              <AccountIcon />
            </IconButton>
          </Link>
        </CustomToolbar>
      </C.Paper>
    </C.AppBar>
  );
};

export default Header;
