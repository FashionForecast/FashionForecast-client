import { S } from './style';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import { useNavigate } from 'react-router-dom';
import { MY_REGION } from '@/constants/localStorage/key';
import useGeolocation from '@/hooks/useGeolocation';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/Location';

const CurrentRegionButton = () => {
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { geolocation, isProcessing } = useGeolocation();

  //TODO: alert 제거
  const handleClick = () => {
    if (!isProcessing) {
      dispatch(currentRegionActions.setCurrentRegion(geolocation));
      localStorage.removeItem(MY_REGION);
      navigate('/');
    }
  };

  return (
    <S.Wrapper>
      <CustomButton
        variant='outlined'
        disabled={currentRegion?.isGPS || !geolocation}
        color='inherit'
        size='large'
        fullWidth
        startIcon={
          <LocationIcon
            color={
              currentRegion?.isGPS || !geolocation ? 'disabled' : 'default'
            }
          />
        }
        onClick={handleClick}
      >
        현재 위치로 설정하기
      </CustomButton>
    </S.Wrapper>
  );
};

export default CurrentRegionButton;
