import CustomAppBar from '@/components/CustomMui/CustomAppBar';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

const AppBar = styled(CustomAppBar)`
  position: fixed;
  top: 0;
  left: 50%;
  max-width: 768px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blueGrey[300]};
  transform: translateX(-50%);
`;

const GoBackButton = styled(IconButton)`
  margin-right: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CancleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 50%;
  transform: translateY(-50%);
`;

export const S = {
  InputWrapper,
  CancleButton,
};

export const C = {
  AppBar,
  GoBackButton,
};
