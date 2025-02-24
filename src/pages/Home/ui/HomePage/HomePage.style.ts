import styled from '@emotion/styled';

const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const TabsWrap = styled.div`
  padding-left: 10px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

export const S = { HomeWrap, TabsWrap };
