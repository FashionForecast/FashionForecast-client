import styled from '@emotion/styled';
import { ListItem } from '@mui/material';

export const Item = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0;
  padding: 12px 16px;
  cursor: pointer;

  & strong {
    font-weight: 400;
    color: #2077af;
  }
`;
