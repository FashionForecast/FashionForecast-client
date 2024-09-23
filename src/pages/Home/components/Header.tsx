import CustomToolbar from '@/components/CustomToolBar';
import AccountIcon from '@/components/icon/Account';
import LocationIcon from '@/components/icon/Location';
import TriangleIcon from '@/components/icon/Triangle';
import { IconButton } from '@mui/material';
import CustomButton from '@/components/CustomButton';
import { C } from './Header.style';
import useAppSelector from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import useGeolocation from '../../../hooks/useGeolocation';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const { geolocation, isProcessing } = useGeolocation();
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const dispatch = useAppDispatch();

  // 사용자의 현재 지역 설정
  useEffect(() => {
    if (currentRegion) return;

    if (!isProcessing) {
      dispatch(currentRegionActions.setCurrentRegion(geolocation));
    }
  }, [dispatch, geolocation, isProcessing, currentRegion]);

  return (
    <C.AppBar position='relative'>
      <C.Paper>
        <CustomToolbar>
          <IconButton>
            <img src='/logo.svg' alt='로고 이미지' />
          </IconButton>

          {isProcessing && <CustomButton fullWidth />}
          {!isProcessing && (
            <C.SearchLink to={'/search'}>
              <CustomButton
                startIcon={currentRegion?.isGPS && <LocationIcon />}
                endIcon={<TriangleIcon />}
                fullWidth
              >
                {currentRegion?.region}
              </CustomButton>
            </C.SearchLink>
          )}

          <Link to={'/login'}>
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
