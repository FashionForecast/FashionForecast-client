import CustomToolbar from '@/components/CustomMui/CustomToolBar';
import AccountIcon from '@/assets/svg/account.svg?react';
import LocationIcon from '@/components/icon/Location';
import TriangleIcon from '@/assets/svg/triangle.svg?react';
import { IconButton } from '@mui/material';
import CustomButton from '@/components/CustomMui/CustomButton';
import { C } from './style';
import useAppSelector from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import useGeolocation from '../../../../hooks/useGeolocation';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';

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

          <IconButton>
            <AccountIcon />
          </IconButton>
        </CustomToolbar>
      </C.Paper>
    </C.AppBar>
  );
};

export default Header;
