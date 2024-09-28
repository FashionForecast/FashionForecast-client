import styled from '@emotion/styled';
import { List, ListItem } from '@mui/material';

const RecentList = styled(List)`
  padding: 0;
`;

export const Item = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 12px 16px;
  cursor: pointer;
`;

export const C = {
  RecentList,
  Item,
};
