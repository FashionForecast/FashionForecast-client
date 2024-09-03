import { Outlet } from 'react-router-dom';
import * as S from './style';
import { GUEST_UUID, MY_REGION } from '@/constants/localStorage/key';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { guestLogin } from '@/service/login';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import useA2HS from './hooks/useA2HS';
import { Snackbar } from '@mui/material';

export default function RootLayout() {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const snackbarRef = useRef<HTMLDivElement>(null);

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

  const hideSnackbar = () => {
    setIsVisible(false);
  };

  // 터치 시작 지점 저장
  const handlePointerDown = (e: React.PointerEvent) => {
    setTouchStartX(e.clientX);
  };

  // 터치 끝 지점 저장 및 스와이프 거리 계산
  const handlePointerMove = (e: React.PointerEvent) => {
    if (touchStartX !== 0) {
      setTouchEndX(e.clientX);
    }
  };

  // 터치가 끝났을 때 위치를 조정
  const handlePointerEnd = () => {
    if (!snackbarRef.current) return;

    const snackbarWidth = snackbarRef.current.offsetWidth; // 스낵바의 너비
    const swipeDistance = Math.abs(touchStartX - touchEndX);

    if (swipeDistance >= snackbarWidth / 2 && touchEndX !== 0) {
      hideSnackbar();
    } else {
      setTouchEndX(0);
    }

    setTouchStartX(0);
  };

  useEffect(() => {
    if (!snackbarRef.current) return;

    const snackbarWidth = snackbarRef.current.offsetWidth; // 스낵바의 너비
    const swipeDistance = Math.abs(touchStartX - touchEndX);

    const opacity = Math.max(1 - swipeDistance / snackbarWidth, 0);

    snackbarRef.current.style.opacity = `${opacity}`;
    snackbarRef.current.style.transform = `translateX(-50%) translateX(${
      touchEndX - touchStartX
    }px)`;
  }, [touchEndX]);

  return (
    <S.Main>
      {deferredPrompt && (
        <Snackbar
          ref={snackbarRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          open={isVisible}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          message='홈화면에 바로가기를 추가할 수 있어요!'
          action={<button onClick={installApp}>추가하기</button>}
        />
      )}

      <Outlet />
    </S.Main>
  );
}
