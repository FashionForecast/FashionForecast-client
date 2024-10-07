import styled from '@emotion/styled';

const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Heading = styled.h1`
  ${({ theme }) => theme.typo.h5}
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const S = {
  UserWrap,
  Heading,
};
