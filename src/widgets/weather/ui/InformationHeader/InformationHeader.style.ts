import styled from '@emotion/styled';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h6`
  ${({ theme }) => theme.typo['subtitle-1']}
  color: ${({ theme }) => theme.colors.primary.dark}
`;

export const S = { Header, Title };
