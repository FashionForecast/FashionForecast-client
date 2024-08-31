import { Toolbar as MuiToolbar } from '@mui/material';
import styled from '@emotion/styled';

type MUIToolbarProps = React.ComponentProps<typeof MuiToolbar>;

type CustomToolbarProps = MUIToolbarProps & {
  children: React.ReactNode;
};

const CustomToolbar = ({ children, ...rest }: CustomToolbarProps) => {
  return <ToolbarBase {...rest}>{children}</ToolbarBase>;
};

export default CustomToolbar;

const ToolbarBase = styled(MuiToolbar)`
  padding: 8px 16px;

  @media (min-width: 600px) {
    min-height: 56px;
  }
`;
