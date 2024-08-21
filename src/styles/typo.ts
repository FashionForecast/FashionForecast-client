import { css } from '@emotion/react';

export const typo = {
  h6: getTypoStyle(20, 24, 0.15, 500),
  'body-1': getTypoStyle(16, 24, 0.15),
  'body-2': getTypoStyle(14, 20.02, 0.17),
} as const;

function getTypoStyle(
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  fontWeight: number = 400
) {
  return css`
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `;
}
