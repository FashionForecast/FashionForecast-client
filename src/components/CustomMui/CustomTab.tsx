import { Tab as MuiTab } from '@mui/material';
import styled from '@emotion/styled';

type MuiTabProps = React.ComponentProps<typeof MuiTab>;

const CustomTab = ({ children, ...rest }: MuiTabProps) => {
  return <TabBase {...rest}>{children}</TabBase>;
};

export default CustomTab;

const TabBase = styled(MuiTab)`
  color: rgb(94 95 97 / 80%);

  & svg {
    fill: ${({ theme }) => theme.colors.blueGrey.A56};
  }

  &.Mui-selected {
    color: ${({ theme }) => theme.colors.text.primary};

    & svg {
      fill: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;
