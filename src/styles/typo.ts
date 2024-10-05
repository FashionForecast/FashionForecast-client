import { css } from '@emotion/react';

export const typo = {
  h5: getTypoStyle(24, 32.02, 0),
  h6: getTypoStyle(20, 24, 0.15, 500),
  'body-1': getTypoStyle(16, 24, 0.15),
  'body-2': getTypoStyle(14, 20.02, 0.17),
  'subtitle-1': getTypoStyle(16, 28, 0.15, 400),
  'subtitle-2': getTypoStyle(14, 21.98, 0.1, 500),
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
