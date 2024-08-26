import styled from '@emotion/styled';
import { List } from '@mui/material';

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
  Aside,
};

export const C = {
  RegionList,
};
