import { OutfitType } from '@/types/clothes';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, css } from '@mui/material';

const RecommendWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 256px;
`;

const ClothesCard = styled(Card, forwardPropOption)<{
  $outfitType: OutfitType;
}>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100%;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }

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
  width: 64px;
  height: 64px;
  margin: 0 32px 0 16px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const C = { ClothesCard };

export const S = { RecommendWrap, ImageWrap, ChipWrapper };

function getChipColor(outfitType: OutfitType, theme: Theme) {
  let bgColor = '';

  switch (outfitType) {
    case 'TOP':
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
