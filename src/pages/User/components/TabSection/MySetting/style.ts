import styled from '@emotion/styled';

const MySettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 16px 16px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Ul = styled.ul`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;

  &:first-of-type {
    margin-bottom: 32px;
  }
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const Divder = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 12px;
  background-color: ${({ theme }) => theme.colors.blueGrey[300]};
`;

export const S = {
  MySettingWrap,
  ContentWrap,
  Ul,
  Footer,
  Divder,
};
