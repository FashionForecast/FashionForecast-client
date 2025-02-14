import { AppBar as MuiAppBar } from '@mui/material';

type MUIAppBarProps = React.ComponentProps<typeof MuiAppBar>;

type CustomAppBarProps = MUIAppBarProps & {
  children: React.ReactNode;
};

export const CustomAppBar = ({ children, ...rest }: CustomAppBarProps) => {
  return (
    <MuiAppBar color='inherit' elevation={0} {...rest}>
      {children}
    </MuiAppBar>
  );
};
