import CustomToggleButton from '@/components/CustomToggleButton';
import styled from '@emotion/styled';
import { Card, Chip as ChipBase } from '@mui/material';

const Section = styled.section`
  padding: 0 16px 16px;
`;

const ClothesCard = styled(Card)`
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blue[500]};
  border-radius: 16px;

  & h4 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Image = styled.img`
  width: 72px;
  height: 100%;
  margin-right: 16px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled(ChipBase)`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ToggleButon = styled(CustomToggleButton)`
  height: 40px;

  &:first-of-type {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  &:last-of-type {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

export const C = {
  ClothesCard,
  Chip,
  ToggleButon,
};

export const S = { Section, Image, ChipWrapper };
