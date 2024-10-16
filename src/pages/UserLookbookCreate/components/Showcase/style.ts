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
`;

const TopWrap = styled.div`
  position: relative;
  top: ${TOP};
`;

export const S = {
  ShowcaseWrap,
  TopWrap,
};
