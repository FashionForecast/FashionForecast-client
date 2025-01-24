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

export const S = { HourText };
