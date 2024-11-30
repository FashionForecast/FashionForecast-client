import styled from '@emotion/styled';
import { List } from '@mui/material';

const SearchWrapper = styled.div`
  margin-top: 56px;

  @media (min-width: 600px) {
    margin-top: 64px;
  }
`;

const RegionList = styled(List)`
  padding: 0;
`;

export const S = {
  SearchWrapper,
};

export const C = {
  RegionList,
};
