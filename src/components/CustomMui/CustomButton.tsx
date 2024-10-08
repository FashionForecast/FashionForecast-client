import { Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';

type MuiButtonProps = React.ComponentProps<typeof MuiButton>;

type CustomButtonProps = MuiButtonProps & {
  children?: React.ReactNode;
};

const CustomButton = ({ children, ...rest }: CustomButtonProps) => {
  if (children) return <ButtonBase {...rest}>{children}</ButtonBase>;
  return <ButtonBase {...rest} />;
};

export default CustomButton;

const ButtonBase = styled(MuiButton)`
  color: ${({ theme }) => theme.colors.text.primary};

  &.MuiButton-colorPrimary {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.action.disabled};
      background-color: ${({ theme }) =>
        theme.colors.action.disabledBackground};
    }
  }
`;
