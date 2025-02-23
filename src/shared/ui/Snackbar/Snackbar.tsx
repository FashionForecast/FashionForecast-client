import styled from '@emotion/styled';
import { Snackbar as MuiSnackbar } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { forwardPropOption } from '@/shared/lib';

type MuiSnackbarProps = React.ComponentProps<typeof MuiSnackbar>;

type CustomSnackbarProps = MuiSnackbarProps & {
  bottomPosition?: number;
};

const anchorOrigin: MuiSnackbarProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'center',
};
const SWIPE_THRESHOLD = 50;

/**
 * - open - 렌더링 여부
 * - bottomPosition - 하단 위치 조정
 * - message - 텍스트
 * - action - 메시지 오른쪽에 표시할 액션 요소
 * - 이외의 props - [MuiSnackbar](https://mui.com/material-ui/api/snackbar/)
 */
export const Snackbar = ({
  bottomPosition = 16,
  open,
  ...rest
}: CustomSnackbarProps) => {
  const [isClosedBySwipe, setIsClosedBySwipe] = useState(false);
  const [swipeStartPositionX, setSwipeStartPositionX] = useState<number | null>(
    null
  );
  const [isSwiping, setIsSwiping] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [hasTransition, setHasTransition] = useState(false);

  const handleSwipeStart = (e: React.PointerEvent) => {
    setIsSwiping(true);
    setSwipeStartPositionX(e.clientX);
    setHasTransition(false);
  };

  const handleSwipeMove = useCallback(
    (e: PointerEvent) => {
      if (!isSwiping || swipeStartPositionX === null) return;

      const swipeDistance = e.clientX - swipeStartPositionX;
      setSwipeDistance(swipeDistance);
      setOpacity(Math.max(1 - Math.abs(swipeDistance) / 100, 0));
    },
    [isSwiping, swipeStartPositionX]
  );

  const handleSwipeEnd = useCallback(() => {
    setIsSwiping(false);

    if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD) {
      setIsClosedBySwipe(true);
      setSwipeStartPositionX(null);
      return;
    }

    setHasTransition(true);
    setSwipeDistance(0);
    setOpacity(1);
  }, [swipeDistance]);

  useEffect(() => {
    if (!isSwiping) return;
    window.addEventListener('pointermove', handleSwipeMove);
    window.addEventListener('pointerup', handleSwipeEnd);

    return () => {
      window.removeEventListener('pointerup', handleSwipeEnd);
      window.removeEventListener('pointermove', handleSwipeMove);
    };
  }, [isSwiping, handleSwipeEnd, handleSwipeMove]);

  return (
    <BaseSnackbar
      open={isClosedBySwipe === true ? false : open}
      onPointerDown={handleSwipeStart}
      anchorOrigin={anchorOrigin}
      $bottomPosition={bottomPosition}
      $opacity={opacity}
      $swipeDistance={swipeDistance}
      $hasTransition={hasTransition}
      {...rest}
    />
  );
};

const BaseSnackbar = styled(MuiSnackbar, forwardPropOption)<{
  $bottomPosition: number;
  $opacity: number;
  $swipeDistance: number;
  $hasTransition: boolean;
}>`
  position: fixed;
  bottom: ${({ $bottomPosition }) => `${$bottomPosition}px`};
  left: 50%;
  width: max-content;
  max-width: calc(100% - 16px);
  touch-action: none;
  cursor: grab;
  user-select: none;
  opacity: ${({ $opacity }) => $opacity};
  transition: ${({ $hasTransition }) =>
    $hasTransition ? 'transform 0.3s ease-out, opacity 0.3s ease-out' : 'none'};
  transform: translateX(
    calc(-50% + ${({ $swipeDistance }) => `${$swipeDistance}px`})
  );

  &:has(.MuiSnackbarContent-action) {
    width: 100%;
  }

  & .MuiPaper-root {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    min-width: fit-content;
    height: 48px;
    padding: ${({ theme }) => `${theme.padding[0]} 16px`};
    color: ${({ theme }) => theme.colors.white};
    background-color: #434d58;
    border-radius: ${({ theme }) => theme.borderRadius[2]};
  }

  & .MuiSnackbarContent-action {
    padding: 0;
    padding-left: 8px;
    margin: 0;
  }

  @media (min-width: 600px) {
    bottom: ${({ $bottomPosition }) => `${$bottomPosition}px`};
    transform: translateX(
      calc(-50% + ${({ $swipeDistance }) => `${$swipeDistance}px`})
    );
  }
`;
