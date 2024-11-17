import CustomToggleButton from '@/components/CustomMui/CustomToggleButton';
import styled from '@emotion/styled';

const ToggleButton = styled(CustomToggleButton)`
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

const ButtonWrap = styled.div`
  padding: 0 16px;
`;

export const C = {
  ToggleButton,
};

export const S = {
  ButtonWrap,
};
