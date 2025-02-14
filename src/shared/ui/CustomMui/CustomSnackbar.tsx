import { MAX_WIDTH } from '@/shared/consts';
import styled from '@emotion/styled';
import { Snackbar, SnackbarProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

type MuiSnackbarProps = React.ComponentProps<typeof Snackbar>;

type CustomSnackbarProps = MuiSnackbarProps & {
  handleCloseOnSwipe: () => void;
};

const snackbarPosition: SnackbarProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'center',
};

export const CustomSnackbar = ({
  handleCloseOnSwipe,
  ...rest
}: CustomSnackbarProps) => {
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

    if (swipeDistance >= snackbarWidth / 6 && touchEndX !== 0) {
      handleCloseOnSwipe();
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
    <SnackbarBase
      ref={snackbarRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      anchorOrigin={snackbarPosition}
      {...rest}
    />
  );
};

const SnackbarBase = styled(Snackbar)`
  left: 50%;
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 16px;
  touch-action: none;
  cursor: grab;
  user-select: none;
  transform: translateX(-50%);

  & .MuiPaper-root {
    padding: 0 16px;
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.white};

    & .MuiSnackbarContent-message {
      padding: 0;
    }
  }
`;
