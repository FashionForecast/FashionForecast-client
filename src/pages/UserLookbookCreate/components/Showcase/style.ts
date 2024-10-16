import styled from '@emotion/styled';
import { SliderType } from '.';

const TOP = '28px';

const ShowcaseWrap = styled.section<{ $isFocussing: SliderType }>`
  position: relative;
  padding: 46px 0;
  padding: calc(46px - ${TOP}) 0 46px;
  margin: 0 16px;
  overflow: hidden;
  background-color: ${({ $isFocussing, theme }) =>
    $isFocussing ? theme.colors.blueGrey.A23 : theme.colors.white};
  border-radius: 12px;

  & .slider-wrap {
    position: relative;

    &.top {
      top: ${TOP};
      z-index: 20;
      z-index: ${({ $isFocussing }) => ($isFocussing === 'TOP' ? 10 : 20)};
    }

    &.bottom {
      z-index: ${({ $isFocussing }) => ($isFocussing === 'BOTTOM' ? 10 : 20)};
    }
  }
`;

export const S = {
  ShowcaseWrap,
};
