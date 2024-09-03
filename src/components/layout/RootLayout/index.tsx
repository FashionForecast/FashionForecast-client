import { Outlet } from 'react-router-dom';
import * as S from './style';
import { GUEST_UUID, MY_REGION } from '@/constants/localStorage/key';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { guestLogin } from '@/service/login';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import useA2HS from './hooks/useA2HS';

export default function RootLayout() {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();
  const { mutate: guestLoginMutate } = useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => localStorage.setItem(GUEST_UUID, data.data.uuid),
  });
  const dispatch = useAppDispatch();

  // 게스트의 uuid를 저장
  useEffect(() => {
    const uuidGuest = localStorage.getItem(GUEST_UUID);

    if (!uuidGuest) {
      guestLoginMutate();
    }
  }, [guestLoginMutate]);

  // 사용자가 선택한 지역을 현재 지역으로 유지
  useEffect(() => {
    const myRegion = localStorage.getItem(MY_REGION);

    if (myRegion) {
      dispatch(currentRegionActions.setCurrentRegion(JSON.parse(myRegion)));
    }
  }, [dispatch]);

  return (
    <S.Main>
      {deferredPrompt && (
        <div>
          <button onClick={clearPrompt}>취소</button>
          <button onClick={installApp}>홈 화면에 추가</button>
        </div>
      )}

      <Outlet />
    </S.Main>
  );
}
