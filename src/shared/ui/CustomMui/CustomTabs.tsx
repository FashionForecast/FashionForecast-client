import { Tabs as MuiTabs } from '@mui/material';
import styled from '@emotion/styled';

type MuiTabsProps = React.ComponentProps<typeof MuiTabs>;

export const CustomTabs = ({ children, ...rest }: MuiTabsProps) => {
  return <TabsBase {...rest}>{children}</TabsBase>;
};

const TabsBase = styled(MuiTabs)`
  & .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.colors.text.primary};
  }
`;
