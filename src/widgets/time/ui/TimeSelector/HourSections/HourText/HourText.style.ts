import { css } from '@emotion/react';
import styled from '@emotion/styled';

const HourText = styled.text<{ $isVisible: boolean; $isHighlight: boolean }>`
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0.46px;
  pointer-events: none;
  touch-action: none;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  user-select: none;
  fill: ${({ theme }) => theme.colors.blueGrey[600]};
  ${({ $isHighlight, theme }) =>
    $isHighlight &&
    css`
      font-size: 12px;
      font-weight: bold;
      visibility: visible;
      fill: ${theme.colors.white};
    `}
`;

const Tooltip = styled.div<{
  $color: string;
  $top: number;
  $left: number;
  $visible: boolean;
}>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  z-index: 9999;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  pointer-events: none;
  touch-action: none;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  user-select: none;
  background-color: ${({ $color }) => $color};
  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`;

export const S = { HourText, Tooltip };
