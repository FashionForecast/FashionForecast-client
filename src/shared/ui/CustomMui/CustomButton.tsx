import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';

type MuiButtonProps = React.ComponentProps<typeof MuiButton>;

type CustomButtonProps = MuiButtonProps & {
  children?: React.ReactNode;
};

export const CustomButton = ({ children, ...rest }: CustomButtonProps) => {
  if (children) return <ButtonBase {...rest}>{children}</ButtonBase>;
  return <ButtonBase {...rest} />;
};

const ButtonBase = styled(MuiButton)`
  color: ${({ theme }) => theme.colors.text.primary};

  &.MuiButton-colorPrimary {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary.main};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.dark};
      }
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.action.disabled};
      background-color: ${({ theme }) =>
        theme.colors.action.disabledBackground};
    }
  }

  &.MuiButton-containedError {
    color: ${({ theme }) => theme.colors.white};
  }

  &.MuiButton-textError {
    color: ${({ theme }) => theme.colors.error.main};
  }
`;
