import styled from '@emotion/styled';

const UserPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

export const S = {
  UserPageWrap,
};
