import styled from '@emotion/styled';
import { ToggleButtonGroup as MuiToggleButtonGroup } from '@mui/material';

type ToggleButtonGroupProps = React.ComponentProps<typeof MuiToggleButtonGroup>;

export const ToggleButtonGroup = ({ ...rest }: ToggleButtonGroupProps) => {
  return <BaseToggleButtonGroup {...rest} />;
};

const BaseToggleButtonGroup = styled(MuiToggleButtonGroup)`
  & .MuiToggleButtonGroup-firstButton,
  & .MuiToggleButtonGroup-lastButton {
    border-radius: 0;
  }
`;
