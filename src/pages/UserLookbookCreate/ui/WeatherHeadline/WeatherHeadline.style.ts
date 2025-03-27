import styled from '@emotion/styled';

import { HEADLINE_HEIGHT } from '../../model/consts';

const HeadlineWrap = styled.div`
  height: ${HEADLINE_HEIGHT};
  padding: 8px 16px;
`;

const Headline = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  background-color: ${({ $color }) => $color};
  border-radius: 12px;
`;

const Temperature = styled.strong<{ $color: string }>`
  ${({ theme }) => theme.typo['subtitle-1']};
  color: ${({ $color }) => $color};
`;

const Summary = styled.div`
  ${({ theme }) => theme.typo['body-2']};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const S = {
  HeadlineWrap,
  Headline,
  Temperature,
  Summary,
};
