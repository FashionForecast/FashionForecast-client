import CustomAppBar from '@/components/CustomAppBar';
import CustomPaper from '@/components/CustomPaper';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const AppBar = styled(CustomAppBar)`
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Paper = styled(CustomPaper)`
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const SearchLink = styled(Link)`
  width: 100%;
`;

export const C = {
  AppBar,
  Paper,
  SearchLink,
};
