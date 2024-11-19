import styled from '@emotion/styled';
import CustomAppBar from '../CustomMui/CustomAppBar';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { HeaderColor, HeaderPosition } from '.';
import { css, Theme } from '@emotion/react';
import { MAX_WIDTH } from '@/constants/css';

const AppBar = styled(CustomAppBar, forwardPropOption)<{
  $color: HeaderColor;
  $position: HeaderPosition;
}>`
  position: relative;
  background-color: ${({ $color, theme }) => getColor($color, theme)};

  ${({ $position, theme }) =>
    $position === 'fixed' &&
    css`
      position: fixed;
      top: 0;
      left: 50%;
      max-width: ${MAX_WIDTH};
      border-bottom: 1px solid ${theme.colors.blueGrey[300]};
      transform: translateX(-50%);
    `}

  & .MuiPaper-root {
    background-color: ${({ $color, theme }) => getColor($color, theme)};
  }

  & .MuiToolbar-root {
    display: flex;
    justify-content: space-between;
  }
`;

export const C = { AppBar };

function getColor(color: HeaderColor, theme: Theme) {
  if (color === 'blueGrey') return theme.colors.blueGrey[100];
  return theme.colors.white;
}
