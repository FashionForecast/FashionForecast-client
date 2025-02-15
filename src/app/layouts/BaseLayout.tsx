import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { PageFallback } from '@/widgets/PageFallback';
import { A2hsSnackbar } from '@/widgets/Snackbar';

import { guestLogin, storeAccessToken } from '@/entities/auth';
import { useGeolocation } from '@/entities/geolocation';
import { goelocationActions } from '@/entities/geolocation/model/slice';
import { storeMember } from '@/entities/member';

import { GUEST_UUID, LOGIN, MY_REGION } from '@/shared/consts';
import regionList from '@/shared/consts/regionList.json';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';

import * as S from './BaseLayout.style';

export const BaseLayout = () => {
  const { updateDefaultRegion, updateGPSRegion } = useGeolocation();
  const user = useAppSelector((state) => state.member.info);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: guestLoginMutate } = useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => localStorage.setItem(GUEST_UUID, data.uuid),
  });

  // 게스트의 uuid를 저장
  useEffect(() => {
    const uuidGuest = localStorage.getItem(GUEST_UUID);

    if (!uuidGuest) {
      guestLoginMutate();
    }
  }, [guestLoginMutate]);

  // 사용자가 직접 선택한 지역이 있다면 현재 지역으로 설정
  // 직접 선택한 지역이 없다면 GPS 지역을 현재 지역으로 설정
  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(goelocationActions.updateStatus('error'));
      updateDefaultRegion();
      return;
    }

    if (user?.region === 'DEFAULT') {
      updateGPSRegion();
      return;
    }

    const userRegion =
      user?.region &&
      regionList.find((region) => region.region === user.region);
    const localRegion = localStorage.getItem(MY_REGION);
    const basicRegion = localRegion && JSON.parse(localRegion);

    if (userRegion || basicRegion) {
      dispatch(goelocationActions.updateGeolocation(userRegion || basicRegion));
      return;
    }

    updateGPSRegion();
  }, [user?.region]);

  // 이전에 로그인 한 사용자의 로그인 처리
  useEffect(() => {
    async function handleLogin() {
      try {
        const accessToken = await storeAccessToken(dispatch);
        await storeMember(accessToken, dispatch);
      } catch (error) {
        console.error('자동 로그인에 실패했습니다.');
        navigate('/login');
      } finally {
        setIsLoggingIn(false);
      }
    }

    const isPrevLoggedIn = localStorage.getItem(LOGIN);

    if (isPrevLoggedIn) {
      handleLogin();
      return;
    }

    setIsLoggingIn(false);
  }, []);

  // 성별이 설정되어 있지 않으면, 성별 설정 페이지로 이동
  useEffect(() => {
    if (user && !user.gender) {
      navigate('/user/gender');
    }
  }, [pathname, user?.gender]);

  if (isLoggingIn) return <PageFallback />;
  return (
    <S.Main>
      <Outlet />
      <A2hsSnackbar />
    </S.Main>
  );
};
