import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { MAX_WIDTH } from '@/shared/consts';

const PageFallbackWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${MAX_WIDTH};
  height: 100dvh;
`;

const rotation = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Logo = styled.img<{ $isVisible: boolean }>`
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  animation: ${rotation} 1s ease infinite;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      visibility: visible;
      opacity: 1;
    `};
`;

export const S = { PageFallbackWrap, Logo };
