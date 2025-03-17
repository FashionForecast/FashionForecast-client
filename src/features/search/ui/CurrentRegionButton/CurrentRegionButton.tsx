import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setMemberDefaultRegion, storeMember } from '@/entities/member';
import { regionActions } from '@/entities/region';

import { REGION } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { Button, LocationIcon, Dialog } from '@/shared/ui';

import { SearchLocationState } from '../../model/types';

import { S } from './CurrentRegionButton.style';

export const CurrentRegionButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const {
    geolocation,
    selectedRegion,
    status: geolocationStatus,
  } = useAppSelector((state) => state.region);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state }: SearchLocationState = useLocation();
  const snackbar = useSnackbar();

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

    setCurrentRegionUpdate();
  };

  const setCurrentRegionUpdate = () => {
    if (!geolocation) return;

    localStorage.setItem(REGION, geolocation.region);
    dispatch(regionActions.updateSelectedRegion(geolocation));
    navigate('/');
  };

  const updatePersonalRegionSetting = () => {
    setIsLoading(true);
    mutate(undefined, {
      onSuccess: async () => {
        geolocation &&
          dispatch(regionActions.updateSelectedRegion(geolocation));
        await storeMember(accessToken, dispatch);
        navigate('/user?tab=set');
      },
      onError: () => snackbar.open('위치 설정 변경에 오류가 발생했어요'),
      onSettled: () => setIsLoading(false),
    });
  };

  const isDisabled = () =>
    isLoading ||
    (state?.mode !== 'set' && selectedRegion?.region === geolocation?.region);

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

      <Dialog
        onClose={handleDialogClose}
        open={isDialogOpen}
        contentSlot={
          '위치 기능을 활성화하거나 브라우저 위치 권한을 확인해주세요.'
        }
        actionsSlot={<Button onClick={handleDialogClose}>확인</Button>}
      />
    </>
  );
};
