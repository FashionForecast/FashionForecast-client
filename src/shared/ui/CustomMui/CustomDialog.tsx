import { Dialog as MuiDialog } from '@mui/material';
import styled from '@emotion/styled';

type MuiDialogProps = React.ComponentProps<typeof MuiDialog>;

export const CustomDialog = ({ children, ...rest }: MuiDialogProps) => {
  return <DialogBase {...rest}>{children}</DialogBase>;
};

const DialogBase = styled(MuiDialog)`
  & .MuiPaper-root {
    width: 100%;
    margin: 16px;
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
