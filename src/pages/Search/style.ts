import styled from '@emotion/styled';
import { List } from '@mui/material';

const SearchWrapper = styled.div`
  margin-top: 56px;

  @media (min-width: 600px) {
    margin-top: 64px;
  }
`;

const regionSetButtonWrapper = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid rgb(0 0 0 / 12%);
`;

const RegionList = styled(List)`
  padding: 0;
`;

export const S = {
  SearchWrapper,
  regionSetButtonWrapper,
};

export const C = {
  RegionList,
};
