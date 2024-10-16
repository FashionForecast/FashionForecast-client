import styled from '@emotion/styled';

const TOP = '28px';

const ShowcaseWrap = styled.section`
  padding: 46px 0;
  padding: calc(46px - ${TOP}) 0 46px;
  margin: 0 16px;
  background-color: ${({ theme }) => theme.colors.white};
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
