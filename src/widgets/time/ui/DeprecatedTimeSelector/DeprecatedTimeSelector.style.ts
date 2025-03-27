import styled from '@emotion/styled';
import { css } from '@mui/material';

import { MAX_WIDTH } from '@/shared/consts';
import { forwardPropOption } from '@/shared/lib';
import { Button } from '@/shared/ui';

const TimeSelector = styled.section`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${MAX_WIDTH};
  touch-action: none;
  border-top: 1px solid ${({ theme }) => theme.colors.elevation.outlined};
  transform: translateX(-50%);
`;

const TimeRange = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Hypen = styled.div`
  flex-shrink: 0;
  width: 14px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

const CheckButton = styled(Button, forwardPropOption)<{
  $isChange: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 4px;

  ${({ $isChange, theme }) =>
    css`
      background-color: ${$isChange
        ? theme.colors.primary.main
        : theme.colors.action.disabledBackground};

      &:hover {
        background-color: ${$isChange
          ? theme.colors.primary.main
          : theme.colors.action.disabledBackground};
      }
    `}
`;

export const C = {
  CheckButton,
};

export const S = {
  TimeSelector,
  TimeRange,
  Hypen,
};
