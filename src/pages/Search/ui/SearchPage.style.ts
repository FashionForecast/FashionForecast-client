import styled from '@emotion/styled';
import { List } from '@mui/material';

const SearchPageWrap = styled.div`
  margin-top: 56px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const InputWrap = styled.div`
  padding: 8px 16px;
`;

const RegionList = styled(List)`
  padding: 0;
`;

export const S = {
  SearchPageWrap,
  InputWrap,
};

export const C = {
  RegionList,
};
