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

const List = styled.ul`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;

  &:first-of-type {
    margin-bottom: 32px;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blueGrey.A30};

  &.divider-thick {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const TextWrap = styled.div`
  margin-left: 16px;

  & h6 {
    ${({ theme }) => theme.typo['body-1']}
  }

  & span {
    ${({ theme }) => theme.typo['body-2']}
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
  List,
  ListItem,
  TextWrap,
  Footer,
  Divder,
};
