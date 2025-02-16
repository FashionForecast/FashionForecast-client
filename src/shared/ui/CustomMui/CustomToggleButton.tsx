import styled from '@emotion/styled';
import { ToggleButton as MuiToggleButton } from '@mui/material';

type MuiToggleButtonProps = React.ComponentProps<typeof MuiToggleButton>;

export const CustomToggleButton = ({
  children,
  ...rest
}: MuiToggleButtonProps) => {
  return <ToggleButtonBase {...rest}>{children}</ToggleButtonBase>;
};

const ToggleButtonBase = styled(MuiToggleButton)`
  ${({ theme }) => theme.typo['body-1']}
  color: ${({ theme }) => theme.colors.primary.main};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryState.hover};
  }

  &.MuiToggleButton-root.Mui-selected {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary.main};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.blueGrey['700']};
      }
    }
  }

  &.MuiToggleButton-root.Mui-disabled {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;
