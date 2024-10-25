import { S } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import { MY_REGION } from '@/constants/localStorage/key';
import useGeolocation from '@/hooks/useGeolocation';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/Location';
import useAppSelector from '@/hooks/useAppSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setUserRegion } from '@/service/auth';
import { useState } from 'react';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import { storeUser } from '@/utils/auth';
import useAppDispatch from '@/hooks/useAppDispatch';

export type SearchLocationState = {
  state?: {
    mode?: 'set';
  };
};

const CurrentRegionButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  const { geolocation, updateGPSRegion } = useGeolocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state }: SearchLocationState = useLocation();
  const { openSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => setUserRegion('DEFAULT', accessToken),
  });

  const handleClick = () => {
    if (state?.mode === 'set') {
      updatePersonalRegionSetting();
      return;
    }

    setCurrntRegionUpdate();
  };

  const setCurrntRegionUpdate = () => {
    updateGPSRegion();
    localStorage.removeItem(MY_REGION);
    navigate('/');
  };

  const updatePersonalRegionSetting = () => {
    setIsLoading(true);
    mutate(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['weather'] });
        await storeUser(accessToken, dispatch);
        navigate('/user?tab=set');
      },
      onError: () => openSnackbar('위치 설정 변경에 오류가 발생했어요'),
      onSettled: () => setIsLoading(false),
    });
  };

  const isDisabled = () =>
    isLoading || (state?.mode !== 'set' && geolocation?.isGPS);

  return (
    <S.Wrapper>
      <CustomButton
        variant='outlined'
        disabled={isDisabled()}
        color='inherit'
        size='large'
        fullWidth
        startIcon={
          <LocationIcon color={isDisabled() ? 'disabled' : 'default'} />
        }
        onClick={handleClick}
      >
        현재 위치로 설정하기
      </CustomButton>
    </S.Wrapper>
  );
};

export default CurrentRegionButton;
