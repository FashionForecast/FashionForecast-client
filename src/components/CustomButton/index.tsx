import { Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';

type MuiButtonProps = React.ComponentProps<typeof MuiButton>;

type CustomButtonProps = MuiButtonProps & {
  children: React.ReactNode;
};

const CustomButton = ({ children, ...rest }: CustomButtonProps) => {
  return <ButtonBase {...rest}>{children}</ButtonBase>;
};

export default CustomButton;

const ButtonBase = styled(MuiButton)`
  color: ${({ theme }) => theme.colors.text.primary};
`;
