import styled from '@emotion/styled';
import { AppBar, IconButton, List, TextField } from '@mui/material';

export const Header = styled(AppBar)`
  position: fixed;
  top: 0;
  left: 50%;
  max-width: 768px;
  border-bottom: 1px solid #b2becc;
  transform: translateX(-50%);
`;

export const GoBackButton = styled(IconButton)`
  margin-right: 16px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled(TextField)`
  & input {
    padding: 6px 36px 6px 12px;
  }
`;

export const CancleButton = styled.button`
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

export const RegionList = styled(List)`
  padding: 0;
  margin-top: 56px;

  @media (min-width: 600px) {
    margin-top: 64px;
  }
`;

export const Aside = styled.aside`
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
