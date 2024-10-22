import CustomToggleButton from '@/components/CustomMui/CustomToggleButton';
import { OutfitType } from '@/types/clothes';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { Card, css } from '@mui/material';

const Section = styled.section`
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const TitleWrap = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;

  & h6 {
    ${({ theme }) => theme.typo['subtitle-1']}
  }

  & span {
    ${({ theme }) => theme.typo['body-2']}
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const SliderItem = styled.li`
  padding: 0 16px;
  margin-bottom: 16px;
`;

const ClothesCard = styled(Card, forwardPropOption)<{
  $outfitType: OutfitType;
}>`
  display: flex;
  align-items: center;
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

const LookbookList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;
  height: 100%;
`;

const LookbookCard = styled.li<{ $content?: 'lookbook' | 'add' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(50% - 5px);
  max-height: calc(50% - 5px);
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  ${({ $content = 'lookbook', theme }) =>
    $content === 'add' &&
    css`
      justify-content: flex-end;
      padding: 8px 0;
      background-color: transparent;
      border: 1px dashed ${theme.colors.elevation.outlined};
      border-radius: 12px;

      & svg {
        width: 22px;
        height: 22px;
        margin-bottom: 52px;
      }

      & span {
        ${theme.typo['subtitle-1']}
      }
    `}
`;

const MoveButton = styled.div<{ $position?: 'left' | 'right' }>`
  ${({ theme }) => theme.typo['body-2']}
  position: absolute;
  top: 50%;
  left: 0;
  padding: 8px 4px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);

  ${({ $position = 'left' }) =>
    $position === 'right' &&
    css`
      right: 0;
      left: auto;
      border-radius: 0;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    `}
`;

const ButtonWrap = styled.div`
  padding: 0 16px;
`;

export const C = {
  ClothesCard,
  ToggleButon,
};

export const S = {
  Section,
  TitleWrap,
  SliderItem,
  ImageWrap,
  ChipWrapper,
  LookbookList,
  LookbookCard,
  MoveButton,
  ButtonWrap,
};

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
