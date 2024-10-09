import { css } from '@emotion/react';
import styled from '@emotion/styled';

const TimeSelector = styled.div<{ $disabled: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  transition: 0.2s opacity ease-in-out;

  ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `}
`;

const Hypen = styled.div`
  flex-shrink: 0;
  width: 14px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

export const S = { TimeSelector, Hypen };
