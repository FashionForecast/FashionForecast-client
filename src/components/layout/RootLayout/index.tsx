import { Outlet, useNavigate } from 'react-router-dom';
import * as S from './style';
import { GUEST_UUID, LOGIN, MY_REGION } from '@/constants/localStorage/key';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { guestLogin } from '@/service/login';
import useAppDispatch from '@/hooks/useAppDispatch';
import A2hsSnackbar from './components/A2hsSnackbar';
import { goelocationActions } from '@/redux/slice/geolocationSlice';
import useGeolocation from '@/hooks/useGeolocation';
import { storeAccessToken, storeUser } from '@/utils/auth';

export default function RootLayout() {
  const { updateDefaultRegion, updateGPSRegion } = useGeolocation();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: guestLoginMutate } = useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => localStorage.setItem(GUEST_UUID, data.data.uuid),
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
      alert('위치 권한을 사용할 수 없는 브라우저 입니다.');
      updateDefaultRegion();
      return;
    }

    const myRegion = localStorage.getItem(MY_REGION);

    if (myRegion) {
      dispatch(goelocationActions.updateGeolocation(JSON.parse(myRegion)));
      return;
    }

    updateGPSRegion();
  }, []);

  // 이전에 로그인 한 사용자의 로그인 처리
  useEffect(() => {
    async function handleLogin() {
      try {
        const accessToken = await storeAccessToken(dispatch);
        const user = await storeUser(accessToken, dispatch);

        if (!user?.gender) {
          navigate('/user/gender');
        }
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

  if (isLoggingIn) return <></>;
  return (
    <S.Main>
      <Outlet />
      <A2hsSnackbar />
    </S.Main>
  );
}
