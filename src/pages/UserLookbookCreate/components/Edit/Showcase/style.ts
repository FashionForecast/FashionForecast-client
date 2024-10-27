import styled from '@emotion/styled';
import { SliderType } from '.';

const TOP = '31px';

const ShowcaseWrap = styled.section<{ $isFocussing: SliderType }>`
  position: relative;
  padding: calc(46px - ${TOP}) 0 46px;
  margin: 0 16px;
  overflow: hidden;
  background-color: ${({ $isFocussing, theme }) =>
    $isFocussing ? theme.colors.blueGrey.A23 : theme.colors.white};
  border-radius: 12px;
`;

const SliderWrap = styled.div<{ $zIndex?: number | boolean }>`
  position: relative;

  &.top {
    top: ${TOP};
    z-index: ${({ $zIndex }) => $zIndex};
  }
`;

export const S = {
  ShowcaseWrap,
  SliderWrap,
};
