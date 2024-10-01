import CustomButton from '@/components/CustomMui/CustomButton';
import CustomSnackbar from '@/components/CustomMui/CustomSnackbar';
import styled from '@emotion/styled';

const Snackbar = styled(CustomSnackbar)`
  position: fixed;
  bottom: 80px;
  width: 100%;
  max-width: 768px;
  padding: 0 16px;
  touch-action: none;
  cursor: grab;
  user-select: none;

  & .MuiPaper-root {
    display: flex;
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
