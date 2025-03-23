import styled from '@emotion/styled';

const ShowcaseWrap = styled.section`
  position: relative;
  padding-bottom: 22px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const SliderWrap = styled.div`
  position: relative;

  &:first-of-type {
    top: 42px;
  }
`;

export const S = {
  ShowcaseWrap,
  SliderWrap,
};
