import CustomAppBar from '@/components/CustomMui/CustomAppBar';
import CustomPaper from '@/components/CustomMui/CustomPaper';
import CustomToolbar from '@/components/CustomMui/CustomToolbar';
import styled from '@emotion/styled';

const AppBar = styled(CustomAppBar)`
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Paper = styled(CustomPaper)`
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Toolbar = styled(CustomToolbar)`
  display: flex;
  justify-content: space-between;
`;

export const C = {
  AppBar,
  Paper,
  Toolbar,
};
