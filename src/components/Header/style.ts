import styled from '@emotion/styled';
import CustomAppBar from '../CustomMui/CustomAppBar';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { HeaderColor } from '.';
import { Theme } from '@emotion/react';

const AppBar = styled(CustomAppBar, forwardPropOption)<{ $color: HeaderColor }>`
  background-color: ${({ $color, theme }) => getColor($color, theme)};

  & .MuiPaper-root {
    background-color: ${({ $color, theme }) => getColor($color, theme)};
  }
`;

export const C = { AppBar };

function getColor(color: HeaderColor, theme: Theme) {
  if (color === 'blueGrey') return theme.colors.blueGrey[100];
  return theme.colors.white;
}
