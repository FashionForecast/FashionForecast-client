import styled from '@emotion/styled';
import { Chip } from '@mui/material';

export const Button = styled.button`
  padding: 0;
  background-color: inherit;
`;

export const LocationChip = styled(Chip)`
  &:has(svg) {
    padding-left: 8px;
  }
`;
