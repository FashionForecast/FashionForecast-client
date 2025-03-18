import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setMemberRegion, storeMember } from '@/entities/member';
import { regionActions } from '@/entities/region';

import { REGION } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { ListItemButton, RegionIcon, CheckCircleIcon } from '@/shared/ui';

import { SearchPageState } from '../../model/types';

import { S } from './GeolocationButton.style';

export const GeolocationButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { geolocation, selectedRegion } = useAppSelector(
    (state) => state.region
  );
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const searchPageState: SearchPageState = useLocation().state;

  const isSelected = checkSelected();

  const { mutate } = useMutation({
    mutationFn: () => setMemberRegion('DEFAULT', accessToken),
  });

  const handleGeolocationButtonClick = () => {
    if (searchPageState?.mode === 'memberSetting') {
      updateMemberRegion();
      return;
    }

    setSelectedRegionToGeolocation();
  };

  const setSelectedRegionToGeolocation = () => {
    if (!geolocation) return;

    localStorage.setItem(REGION, geolocation.region);
    dispatch(regionActions.updateSelectedRegion(geolocation));
    navigate('/');
  };

  const updateMemberRegion = () => {
    setIsLoading(true);
    mutate(undefined, {
      onSuccess: async () => {
        await storeMember(accessToken, dispatch);
        navigate('/user?tab=set');
      },
      onError: () => snackbar.open('위치 설정 변경에 오류가 발생했어요'),
      onSettled: () => setIsLoading(false),
    });
  };

  function checkSelected() {
    if (searchPageState?.mode === 'memberSetting') return false;
    return selectedRegion?.region === geolocation?.region;
  }

  return (
    <S.GeolocationButtonWrap>
      {geolocation && (
        <ListItemButton
          label={geolocation.region}
          disabled={isLoading}
          selected={isSelected}
          iconPosition={{
            left: <RegionIcon color={isSelected ? 'white' : 'primary'} />,
            right: isSelected && <CheckCircleIcon />,
          }}
          onClick={handleGeolocationButtonClick}
        />
      )}
      {/* { && <S.ErrorBanner></S.ErrorBanner>} */}
    </S.GeolocationButtonWrap>
  );
};
