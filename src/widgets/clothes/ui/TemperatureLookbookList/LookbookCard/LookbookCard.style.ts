import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Chip } from '@/shared/ui';

const LookbookCardWrap = styled.li<{ $color: string }>`
  padding: 12px 16px;
  margin: 0 16px 12px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.borderRadius[2]};

  &:last-of-type {
    margin-bottom: 16px;
  }
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const LABELS = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  color: ${({ $color }) => $color};
`;

const Temperature = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']}
`;

const Summary = styled.span`
  ${({ theme }) => theme.typo['body-2']}
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ClothesGroup = styled.article`
  display: flex;
  gap: 10px;
`;

const LookbookLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 64px;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopNameChip = styled(Chip)`
  height: 20px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;

const BottomNameChip = styled(Chip)`
  height: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const S = {
  LookbookCardWrap,
  CardHeader,
  LABELS,
  Temperature,
  Summary,
  ClothesGroup,
  ChipWrap,
};

export const C = { LookbookLink, TopNameChip, BottomNameChip };
