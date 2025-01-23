import { css } from '@emotion/react';
import styled from '@emotion/styled';

const HourText = styled.text<{ $isVisible: boolean; $isHighlight: boolean }>`
  line-height: 14px;
  letter-spacing: 0.46px;
  pointer-events: none;
  touch-action: none;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  user-select: none;
  ${({ $isHighlight, theme }) =>
    $isHighlight
      ? css`
          font-size: 12px;
          font-weight: bold;
          fill: ${theme.colors.white};
        `
      : css`
          font-size: 10px;
          fill: ${theme.colors.blueGrey[600]};
        `}
`;

export const S = { HourText };
