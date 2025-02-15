import styled from '@emotion/styled';
import { Radio as MuiRadio } from '@mui/material';

type MuiRadioProps = React.ComponentProps<typeof MuiRadio>;

export const CustomRadio = ({ ...rest }: MuiRadioProps) => {
  return <RadioBase {...rest} />;
};

const RadioBase = styled(MuiRadio)`
  color: ${({ theme }) => theme.colors.text.secondary};

  &.Mui-checked {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
