import CustomButton from '@/components/CustomMui/CustomButton';
import styled from '@emotion/styled';
import { Snackbar as SnackbarBase } from '@mui/material';

const Snackbar = styled(SnackbarBase)`
  position: fixed;
  bottom: 80px;
  left: 50%;
  width: 100%;
  max-width: 768px;
  padding: 0 16px;
  touch-action: none;
  cursor: grab;
  user-select: none;
  transform: translateX(-50%);

  & .MuiPaper-root {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 42px;
    padding: 0 16px;
    color: #212121;
    background-color: ${({ theme }) => theme.colors.white};

    & .MuiSnackbarContent-action {
      padding: 0;
      margin: 0;
    }
  }

  @media (min-width: 600px) {
    bottom: 80px;
  }
`;

const Button = styled(CustomButton)`
  color: ${({ theme }) => theme.colors.info.main};
`;

export const C = { Snackbar, Button };
