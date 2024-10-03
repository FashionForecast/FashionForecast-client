import styled from '@emotion/styled';

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px 32px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 12px;
  background-color: ${({ theme }) => theme.colors.blueGrey[300]};
`;

export const S = {
  Footer,
  Divider,
};
