import styled from '@emotion/styled';

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 16px;

  & h6 {
    ${({ theme }) => theme.typo.h6}
  }
`;

export const S = {
  Header,
};
