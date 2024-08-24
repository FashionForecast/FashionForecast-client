import CustomAppBar from '@/components/CustomAppBar';
import styled from '@emotion/styled';
import { IconButton, List } from '@mui/material';

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

const RegionList = styled(List)`
  padding: 0;
  margin-top: 56px;

  @media (min-width: 600px) {
    margin-top: 64px;
  }
`;

const Aside = styled.aside`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 58px;
  padding: 8px 16px;
  border-top: 1px solid ${(props) => props.theme.colors.blueGrey[300]};

  & svg {
    margin-right: 13px;
  }
`;

export const S = {
  InputWrapper,
  CancleButton,
  Aside,
};

export const C = {
  AppBar,
  GoBackButton,
  RegionList,
};
