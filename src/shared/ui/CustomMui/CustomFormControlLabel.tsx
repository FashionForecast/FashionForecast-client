import { FormControlLabel as MuiFormControlLabel } from '@mui/material';
import styled from '@emotion/styled';

type MuiFormControlLabelProps = React.ComponentProps<
  typeof MuiFormControlLabel
>;

export const CustomFormControlLabel = ({
  ...rest
}: MuiFormControlLabelProps) => {
  return <FormControlLabelBase {...rest} />;
};

const FormControlLabelBase = styled(MuiFormControlLabel)`
  & .MuiFormControlLabel-label {
    ${({ theme }) => theme.typo['body-1']}
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
