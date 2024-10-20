import styled from '@emotion/styled';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

export const S = {
  PageWrap,
};
