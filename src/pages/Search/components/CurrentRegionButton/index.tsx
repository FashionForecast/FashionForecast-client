import { S } from './style';
import { useNavigate } from 'react-router-dom';
import { MY_REGION } from '@/constants/localStorage/key';
import useGeolocation from '@/hooks/useGeolocation';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/Location';

const CurrentRegionButton = () => {
  const { geolocation, updateGPSRegion } = useGeolocation();
  const navigate = useNavigate();

  const handleClick = () => {
    updateGPSRegion();
    localStorage.removeItem(MY_REGION);
    navigate('/');
  };

  return (
    <S.Wrapper>
      <CustomButton
        variant='outlined'
        disabled={geolocation?.isGPS}
        color='inherit'
        size='large'
        fullWidth
        startIcon={
          <LocationIcon color={geolocation?.isGPS ? 'disabled' : 'default'} />
        }
        onClick={handleClick}
      >
        현재 위치로 설정하기
      </CustomButton>
    </S.Wrapper>
  );
};

export default CurrentRegionButton;
