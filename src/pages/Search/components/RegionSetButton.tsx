import CustomButton from '@/components/CustomButton';
import LocationIcon from '@/components/icon/Location';
import { S } from './RegionSetButton.style';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import useGeolocation from '@/pages/Home/components/hooks/useGeolocation';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import { useNavigate } from 'react-router-dom';
import { MY_REGION } from '@/constants/localStorage/key';

const RegionSetButton = () => {
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

    if (!geolocation) {
      alert('현재 위치를 가져오지 못했습니다.');
    }
  };

  return (
    <S.Wrapper>
      <CustomButton
        variant='outlined'
        disabled={currentRegion?.isGPS}
        color='inherit'
        size='large'
        fullWidth
        startIcon={<LocationIcon />}
        onClick={handleClick}
      >
        현재 위치로 설정하기
      </CustomButton>
    </S.Wrapper>
  );
};

export default RegionSetButton;
