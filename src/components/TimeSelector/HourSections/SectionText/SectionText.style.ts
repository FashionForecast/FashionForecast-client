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
      fill: ${theme.colors.white};
    `}
`;

const TooltipForeignObject = styled.foreignObject`
  width: 45px;
  height: 45px;
  pointer-events: none;
  touch-action: none;
  user-select: none;
  border-radius: 50%;
`;

const Tooltip = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ $color }) => $color};
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`;

const TextTooltip = styled.text`
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0.46px;
  pointer-events: none;
  touch-action: none;
  user-select: none;
`;

export const S = { HourText, TooltipForeignObject, TextTooltip, Tooltip };
