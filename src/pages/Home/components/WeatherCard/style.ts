import styled from '@emotion/styled';
import { Avatar, Card, CardContent, Paper } from '@mui/material';

export const WeatherCard = styled(Card)`
  border: none;
  border-radius: 16px;
  box-shadow: none;
`;

export const CustomPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: none;
`;
export const CustomCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;

  &.MuiCardContent-root {
    padding: 0;
  }
`;

export const CustomCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0;
`;

export const Icon = styled(Avatar)`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  background-color: #fff;
`;

export const Header = styled.div`
  ${({ theme }) => theme.typo['body-1']};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subheader = styled.div`
  ${({ theme }) => theme.typo['body-2']}
  color: ${({ theme }) => theme.colors.text.secondary};
`;
export const SubTitle = styled.div`
  ${({ theme }) => theme.typo['subtitle-2']};
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const C = {
  WeatherCard,
  CustomPaper,
  Icon,
};

export const S = {
  CustomCardContent,
  CustomCardHeader,
  Header,
  Subheader,
  SubTitle,
};
