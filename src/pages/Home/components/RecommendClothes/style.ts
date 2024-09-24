import CustomToggleButton from '@/components/CustomToggleButton';
import { OutfitType } from '@/types/clothes';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { Card, css } from '@mui/material';

const Section = styled.section`
  padding: 0 16px 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const ClothesCard = styled(Card, forwardPropOption)<{
  $outfitType: OutfitType;
}>`
  display: flex;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 16px;

  & h4 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-bottom: 8px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  ${({ $outfitType, theme }) => css`
    .MuiChip-root {
      color: ${theme.colors.text.primary};
      background-color: ${getChipColor($outfitType, theme)};
      border: 1px solid #b2becc;
    }
  `}
`;

const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 32px 0 16px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ToggleButon = styled(CustomToggleButton)`
  height: 40px;

  &.MuiToggleButtonGroup-middleButton {
    border-right: 1px solid ${({ theme }) => theme.colors.primary.main};
    border-left: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

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
  ToggleButon,
};

export const S = { Section, ImageWrap, ChipWrapper };

function getChipColor(outfitType: OutfitType, theme: Theme) {
  let bgColor = '';

  switch (outfitType) {
    case 'OUTER':
    case 'TOP':
    case 'LAYERED':
      bgColor = theme.colors.amber[100];
      break;
    case 'BOTTOM':
      bgColor = theme.colors.blue[100];
      break;
    default:
      bgColor = theme.colors.teal[100];
  }

  return bgColor;
}
