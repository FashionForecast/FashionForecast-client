import CustomToggleButton from '@/components/CustomMui/CustomToggleButton';
import styled from '@emotion/styled';

import { css } from '@mui/material';

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
  ToggleButon,
};

export const S = {
  Section,
  TitleWrap,
  SliderItem,
  MoveButton,
  ButtonWrap,
};
