import { useEffect, useRef, useState } from 'react';
import { C } from './style';
import { SnackbarProps } from '@mui/material';
import useA2HS from './hooks/useA2HS';

const snackbarPosition: SnackbarProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'center',
};

const A2hsSnackbar = () => {
  const { deferredPrompt, installApp, clearPrompt: hideSnackbar } = useA2HS();
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const snackbarRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setTouchStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (touchStartX !== 0) {
      setTouchEndX(e.clientX);
    }
  };

  const handlePointerEnd = () => {
    if (!snackbarRef.current) return;

    const snackbarWidth = snackbarRef.current.offsetWidth;
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

    const snackbarWidth = snackbarRef.current.offsetWidth;
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
        open={true}
        anchorOrigin={snackbarPosition}
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
