import styled from '@emotion/styled';
import { ToggleButtonGroup as MuiToggleButtonGroup } from '@mui/material';

type ToggleButtonGroupProps = React.ComponentProps<typeof MuiToggleButtonGroup>;

/**
 * - value - ToggleButtonGroup의 value
 * - onChange - ToggleButton 클릭 시, value 변경
 * - exclusive - 오직 하나의 ToggleButton만 선택 가능
 * - 이외의 props - [MuiToggleButtonGroup](https://mui.com/material-ui/api/toggle-button-group/)
 */
export const ToggleButtonGroup = ({
  children,
  ...rest
}: ToggleButtonGroupProps) => {
  return <BaseToggleButtonGroup {...rest}>{children}</BaseToggleButtonGroup>;
};

const BaseToggleButtonGroup = styled(MuiToggleButtonGroup)`
  & .MuiToggleButtonGroup-firstButton,
  & .MuiToggleButtonGroup-lastButton {
    border-radius: 0;
  }
`;
