import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Avatar, Card, CardContent, Paper } from '@mui/material';

export const WeatherCard = styled(Card)`
  border: none;
  border-radius: 16px;
  box-shadow: none;
`;

export const CustomPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: none;
`;
export const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 8px 0;
  padding-bottom: 0;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const CustomCardHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
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
  color: ${colors.blueGrey[900]};
  opacity: 0.87;
`;

export const Subheader = styled.div`
  ${({ theme }) => theme.typo['body-2']}
  color: ${colors.blueGrey[900]};
  opacity: 0.6;
`;
export const SubTitle = styled.div`
  display: flex;
  align-items: flex-start;
  ${({ theme }) => theme.typo['subtitle-2']};
  color: ${colors.blueGrey[900]};
  opacity: 0.87;
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
