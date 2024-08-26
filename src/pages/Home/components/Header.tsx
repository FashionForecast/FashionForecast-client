import CustomPaper from '@/components/CustomPaper';
import CustomToolbar from '@/components/CustomToolBar';
import AccountIcon from '@/components/icon/Account';
import LocationIcon from '@/components/icon/Location';
import PlusIcon from '@/components/icon/Plus';
import TriangleIcon from '@/components/icon/Triangle';
import { IconButton } from '@mui/material';
import CustomAppBar from '@/components/CustomAppBar';
import CustomButton from '@/components/CustomButton';
import { C } from './Header.style';
import useAppSelector from '@/hooks/useAppSelector';
import { useEffect } from 'react';
import useGeolocation from './hooks/useGeolocation';
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
    <CustomAppBar position='relative'>
      <CustomPaper>
        <CustomToolbar>
          <IconButton>
            <PlusIcon />
          </IconButton>

          {isProcessing && <CustomButton fullWidth />}
          {!isProcessing && (
            <C.SearchLink to={'/search'}>
              <CustomButton
                startIcon={geolocation?.isGPS && <LocationIcon />}
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
      </CustomPaper>
    </CustomAppBar>
  );
};

export default Header;
