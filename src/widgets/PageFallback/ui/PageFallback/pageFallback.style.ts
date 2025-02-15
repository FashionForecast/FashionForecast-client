import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { MAX_WIDTH } from '@/shared/consts';

const Wrap = styled.div`
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

const Logo = styled.img`
  animation: ${rotation} 1s ease infinite;
`;

export const S = { Wrap, Logo };
