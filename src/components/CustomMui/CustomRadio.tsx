import { Radio as MuiRadio } from '@mui/material';
import styled from '@emotion/styled';

type MuiRadioProps = React.ComponentProps<typeof MuiRadio>;

const CustomRadio = ({ ...rest }: MuiRadioProps) => {
  return <RadioBase {...rest} />;
};

export default CustomRadio;

const RadioBase = styled(MuiRadio)`
  color: ${({ theme }) => theme.colors.text.secondary};

  &.Mui-checked {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
