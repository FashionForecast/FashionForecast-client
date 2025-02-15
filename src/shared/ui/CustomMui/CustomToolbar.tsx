import styled from '@emotion/styled';
import { Toolbar as MuiToolbar } from '@mui/material';

type MUIToolbarProps = React.ComponentProps<typeof MuiToolbar>;

type CustomToolbarProps = MUIToolbarProps & {
  children: React.ReactNode;
};

export const CustomToolbar = ({ children, ...rest }: CustomToolbarProps) => {
  return <ToolbarBase {...rest}>{children}</ToolbarBase>;
};

const ToolbarBase = styled(MuiToolbar)`
  padding: 8px 16px;

  @media (min-width: 600px) {
    min-height: 56px;
  }
`;
