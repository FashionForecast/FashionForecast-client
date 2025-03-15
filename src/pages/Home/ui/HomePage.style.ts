import styled from '@emotion/styled';

const HomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-bottom: 114px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const TabsWrap = styled.div`
  padding-left: 10px;
`;

export const S = { HomeWrap, TabsWrap };
