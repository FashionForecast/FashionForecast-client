import styled from '@emotion/styled';
import { Card, Chip as ChipBase } from '@mui/material';

const Section = styled.section`
  padding: 0 16px;
`;

const ClothesCard = styled(Card)`
  display: flex;
  align-items: center;
  height: 96px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blue[500]};
  border-radius: 16px;

  & h4 {
    ${({ theme }) => theme.typo['subtitle-1']}
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Image = styled.img`
  width: 72px;
  height: 100%;
  margin-right: 16px;
`;

const Chip = styled(ChipBase)`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const C = {
  ClothesCard,
  Chip,
};

export const S = { Section, Image };
