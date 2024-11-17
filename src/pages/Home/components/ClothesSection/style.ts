import styled from '@emotion/styled';

import { css } from '@mui/material';

const Section = styled.section`
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const SliderItem = styled.li`
  padding: 0 16px;
  margin-bottom: 16px;
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

export const S = {
  Section,
  SliderItem,
  MoveButton,
};
