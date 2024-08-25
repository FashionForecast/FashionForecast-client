import { Paper as MuiPaper } from '@mui/material';

type MUIPaperProps = React.ComponentProps<typeof MuiPaper>;

type CustomPaperProps = MUIPaperProps & {
  children: React.ReactNode;
};

const CustomPaper = ({ children, ...rest }: CustomPaperProps) => {
  return (
    <MuiPaper elevation={0} {...rest}>
      {children}
    </MuiPaper>
  );
};

export default CustomPaper;
