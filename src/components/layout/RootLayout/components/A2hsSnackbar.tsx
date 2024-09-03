import { useEffect, useRef, useState } from 'react';
import useA2HS from '../hooks/useA2HS';
import { C } from './A2hsSnackbar.style';

const A2hsSnackbar = () => {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS();
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const snackbarRef = useRef<HTMLDivElement>(null);

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
    deferredPrompt && (
      <C.Snackbar
        ref={snackbarRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        open={isVisible}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message='홈화면에 바로가기를 추가할 수 있어요!'
        action={
          <C.Button size='small' onClick={installApp}>
            추가하기
          </C.Button>
        }
      />
    )
  );
};

export default A2hsSnackbar;
