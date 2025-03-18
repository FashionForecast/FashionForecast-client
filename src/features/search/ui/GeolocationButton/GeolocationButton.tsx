import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setMemberRegion, storeMember } from '@/entities/member';
import { regionActions } from '@/entities/region';

import { REGION } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import {
  ListItemButton,
  RegionIcon,
  CheckCircleIcon,
  ErrorOutline,
  Button,
  Dialog,
  PhoneIcon,
  BrowserIcon,
  RefreshIcon,
} from '@/shared/ui';

import { SearchPageState } from '../../model/types';

import { S } from './GeolocationButton.style';

const DIALOG_CONTENTS = [
  {
    icon: <PhoneIcon />,
    title: '기기의 위치 서비스를 켜세요',
    description: (
      <>
        현재 위치를 불러오기 위해서는 기기의 위치 서비스를 켜야 해요.
        <S.DialogSubItem>
          iOS: 설정 &gt; 개인정보 보호 및 보안 &gt; 위치 서비스
        </S.DialogSubItem>
        <S.DialogSubItem>Android: 설정 &gt; 위치</S.DialogSubItem>
      </>
    ),
  },
  {
    icon: <BrowserIcon />,
    title: '브라우저에서 위치 권한을 허용하세요',
    description: (
      <>
        OOTC는 웹 기반 서비스이므로 브라우저 또한 ootc.life에 위치 권한을
        허용해야 해요.
        <S.DialogSubItem>
          브라우저의 주소창 왼쪽 아이콘을 터치하면 웹사이트 설정에 접근할 수
          있어요.
        </S.DialogSubItem>
      </>
    ),
  },
  {
    icon: <RefreshIcon />,
    title: '새로고침을 하세요',
    description:
      '브라우저에서 위치 권한을 변경하신 뒤에는 변경사항이 반영될 수 있도록 OOTC를 새로고침 해주세요.',
  },
];

export const GeolocationButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { geolocation, selectedRegion, geolocationStatus } = useAppSelector(
    (state) => state.region
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const searchPageState: SearchPageState = useLocation().state;

  const isSelected = checkSelected();

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

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
      {geolocationStatus === 'error' && (
        <>
          <S.ErrorBanner>
            <S.LeftContent>
              <ErrorOutline />
              지금은 현재 위치를 불러올 수 없어요
            </S.LeftContent>
            <Button
              variant='text'
              color='error'
              size='small'
              onClick={handleDialogToggle}
            >
              해결하기
            </Button>
          </S.ErrorBanner>

          <Dialog
            open={isDialogOpen}
            onClose={handleDialogToggle}
            titleSlot={'현재 위치를 불러올 수 없어요.'}
            contentSlot={
              <ol>
                {DIALOG_CONTENTS.map(({ icon, title, description }) => (
                  <S.DialogContentItem key={title}>
                    <S.DialogIconWrap>{icon}</S.DialogIconWrap>
                    <div>
                      <strong>{title}</strong>
                      <div>{description}</div>
                    </div>
                  </S.DialogContentItem>
                ))}
              </ol>
            }
            actionsSlot={
              <Button variant='outlined' onClick={handleDialogToggle}>
                닫기
              </Button>
            }
          />
        </>
      )}
    </S.GeolocationButtonWrap>
  );
};
