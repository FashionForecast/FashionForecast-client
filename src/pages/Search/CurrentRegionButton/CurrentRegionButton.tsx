import { S } from './CurrentRegionButton.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { MY_REGION } from '@/constants/localStorage/key';
import useGeolocation from '@/hooks/useGeolocation';
import CustomButton from '@/components/CustomMui/CustomButton';
import LocationIcon from '@/components/icon/Location';
import useAppSelector from '@/hooks/useAppSelector';
import { useMutation } from '@tanstack/react-query';
import { setUserRegion } from '@/services/auth';
import { useState } from 'react';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import { storeUser } from '@/utils/auth';
import useAppDispatch from '@/hooks/useAppDispatch';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import { DialogActions, DialogContent } from '@mui/material';

export type SearchLocationState = {
  state?: {
    mode?: 'set';
  };
};

const CurrentRegionButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    geolocation,
    status: geolocationStatus,
    updateGPSRegion,
  } = useGeolocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state }: SearchLocationState = useLocation();
  const { openSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => setUserRegion('DEFAULT', accessToken),
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleClick = () => {
    if (geolocationStatus === 'error') {
      setIsDialogOpen(true);
      return;
    }

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
        updateGPSRegion();
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
    <>
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

      <CustomDialog fullWidth onClose={handleDialogClose} open={isDialogOpen}>
        <DialogContent>
          위치 기능을 활성화하거나 브라우저 위치 권한을 확인해주세요.
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleDialogClose}>확인</CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default CurrentRegionButton;
