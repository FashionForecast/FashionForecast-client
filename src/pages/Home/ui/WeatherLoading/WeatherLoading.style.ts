import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const moveDown = keyframes` 
  from {
    transform: translateY(0);
  }
  45%, 55% {
    transform:translateY(100%);
  }
  to {
    transform: translateY(200%);
  }
`;

const HomeLoadingWrap = styled.div<{ $isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  opacity: 0;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      visibility: visible;
      opacity: 1;
    `};
`;

const Frame = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 96px;
  height: 96px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

const IconWrap = styled.div`
  position: relative;
  top: -96px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  animation: ${moveDown} 1s ease-in-out infinite;
`;

const Circle = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const S = {
  HomeLoadingWrap,
  Frame,
  IconWrap,
  Circle,
  Text,
};
