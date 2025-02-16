import { css } from '@emotion/react';

export const typo = {
  h5: setTypoStyle({ fontSize: 24, lineHeight: 32.02, letterSpacing: 0 }),
  h6: setTypoStyle({
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: 500,
  }),
  'body-1': setTypoStyle({ fontSize: 16, lineHeight: 24, letterSpacing: 0.15 }),
  'body-2': setTypoStyle({
    fontSize: 14,
    lineHeight: 20.02,
    letterSpacing: 0.17,
  }),
  'subtitle-1': setTypoStyle({
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.15,
    fontWeight: 700,
  }),
  'subtitle-2': setTypoStyle({
    fontSize: 14,
    lineHeight: 21.98,
    letterSpacing: 0.1,
    fontWeight: 700,
  }),
} as const;

type TypoStyle = {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight?: number;
};

function setTypoStyle({
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight = 400,
}: TypoStyle) {
  return css`
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
    letter-spacing: ${letterSpacing}px;
  `;
}
