import { Dialog as MuiDialog } from '@mui/material';
import styled from '@emotion/styled';

type MuiDialogProps = React.ComponentProps<typeof MuiDialog>;

const CustomDialog = ({ children, ...rest }: MuiDialogProps) => {
  return <DialogBase {...rest}>{children}</DialogBase>;
};

export default CustomDialog;

const DialogBase = styled(MuiDialog)`
  & .MuiPaper-root {
    border-radius: 16px;
  }

  & .MuiDialogTitle-root {
    ${({ theme }) => theme.typo.h6}
    color: ${({ theme }) => theme.colors.text.primary};
  }

  & .MuiDialogActions-root {
    padding: 16px;
  }
`;
