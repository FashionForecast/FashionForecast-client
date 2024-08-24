import { Toolbar as MuiToolbar } from '@mui/material';
import styled from '@emotion/styled';

type MUIToolbarProps = React.ComponentProps<typeof MuiToolbar>;

type CustomToolbarProps = MUIToolbarProps & {
  children: React.ReactNode;
};

const CustomToolbar = ({ children }: CustomToolbarProps) => {
  return <ToolbarBase>{children}</ToolbarBase>;
};

export default CustomToolbar;

const ToolbarBase = styled(MuiToolbar)`
  padding: 8px 16px;
`;
