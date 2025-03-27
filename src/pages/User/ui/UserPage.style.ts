import styled from '@emotion/styled';

const UserPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const DivideLine = styled.div`
  height: 1px;
  margin: 0 16px 8px;
  background-color: ${({ theme }) => theme.colors.primary.light};
`;

export const S = {
  UserPageWrap,
  DivideLine,
};
