import styled from '@emotion/styled';

import { SHOWCASE_HEIGHT } from '../../model/consts';

const ShowcaseWrap = styled.section`
  position: relative;
  height: ${SHOWCASE_HEIGHT};
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const SliderWrap = styled.div`
  position: relative;

  &:first-of-type {
    top: 22px;
  }

  &:last-of-type {
    top: -22px;
  }
`;

export const S = {
  ShowcaseWrap,
  SliderWrap,
};
