import { CustomButton } from '@/shared/ui';
import { CustomSnackbar } from '@/shared/ui';
import styled from '@emotion/styled';

const Snackbar = styled(CustomSnackbar)`
  position: fixed;
  bottom: 80px;

  & .MuiPaper-root {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    height: 42px;

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
