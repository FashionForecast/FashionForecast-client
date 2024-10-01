import styled from '@emotion/styled';
import { Snackbar, SnackbarProps } from '@mui/material';
import { forwardRef } from 'react';

type MuiSnackbarProps = React.ComponentProps<typeof Snackbar>;

const snackbarPosition: SnackbarProps['anchorOrigin'] = {
  vertical: 'bottom',
  horizontal: 'center',
};

const CustomSnackbar = forwardRef(({ ...rest }: MuiSnackbarProps, ref) => {
  return <SnackbarBase ref={ref} anchorOrigin={snackbarPosition} {...rest} />;
});

export default CustomSnackbar;

const SnackbarBase = styled(Snackbar)`
  left: 50%;
  transform: translateX(-50%);

  & .MuiPaper-root {
    padding: 0 16px;
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.white};

    & .MuiSnackbarContent-message {
      padding: 0;
    }
  }
`;
