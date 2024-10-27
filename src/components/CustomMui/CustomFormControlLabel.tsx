import { FormControlLabel as MuiFormControlLabel } from '@mui/material';
import styled from '@emotion/styled';

type MuiFormControlLabelProps = React.ComponentProps<
  typeof MuiFormControlLabel
>;

const CustomFormControlLabel = ({ ...rest }: MuiFormControlLabelProps) => {
  return <FormControlLabelBase {...rest} />;
};

export default CustomFormControlLabel;

const FormControlLabelBase = styled(MuiFormControlLabel)`
  & .MuiFormControlLabel-label {
    ${({ theme }) => theme.typo['body-1']}
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
