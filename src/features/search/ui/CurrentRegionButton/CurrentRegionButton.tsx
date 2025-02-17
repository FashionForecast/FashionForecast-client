import { DialogActions, DialogContent } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSnackbar } from '@/app/providers/SnackbarProvider';

import { useGeolocation } from '@/entities/geolocation';
import { setMemberDefaultRegion, storeMember } from '@/entities/member';

import { MY_REGION } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { Button, LocationIcon, CustomDialog } from '@/shared/ui';

import { SearchLocationState } from '../../model/types';

import { S } from './CurrentRegionButton.style';

export const CurrentRegionButton = () => {
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
    mutationFn: () => setMemberDefaultRegion('DEFAULT', accessToken),
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
        await storeMember(accessToken, dispatch);
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
        <Button
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
        </Button>
      </S.Wrapper>

      <CustomDialog fullWidth onClose={handleDialogClose} open={isDialogOpen}>
        <DialogContent>
          위치 기능을 활성화하거나 브라우저 위치 권한을 확인해주세요.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>확인</Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
};
