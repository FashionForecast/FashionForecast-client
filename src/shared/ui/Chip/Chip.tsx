import styled from '@emotion/styled';
import { ChipProps as MuiChipProps, Chip as MuiChip } from '@mui/material';

import { forwardPropOption } from '@/shared/lib';
import { theme } from '@/shared/styles';

type ExcludedColor = Exclude<
  MuiChipProps['color'],
  'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
>;

type CustomColor =
  | 'primary'
  | 'white'
  | 'black'
  | 'blueGrey-100'
  | 'blueGrey-200'
  | 'red-100'
  | 'deepOrange-100'
  | 'orange-100'
  | 'amber-100'
  | 'yellow-100'
  | 'lime-100'
  | 'lightGreen-100'
  | 'green-100'
  | 'teal-100'
  | 'cyan-100'
  | 'lightBlue-100'
  | 'blue-100'
  | 'indigo-100'
  | 'deepPurple-100'
  | 'purple-100'
  | 'pink-100';

type CustomChipProps = Omit<MuiChipProps, 'color'> & {
  color?: CustomColor | ExcludedColor;
};

/**
 * - label - 컨텐츠 내용
 * - variant - 칩 유형
 * - color - 색상
 * - size - 크기
 * - 이외의 props - [MuiChip](https://mui.com/material-ui/api/chip/)
 */
export const Chip = ({ color = 'primary', ...rest }: CustomChipProps) => {
  return <BaseChip $color={color} {...rest} />;
};

const colorMap = getColorMap();

const BaseChip = styled(MuiChip, forwardPropOption)<{
  $color: CustomColor;
}>`
  ${({ theme }) => theme.typo['subtitle-2']}
  height: 24px;
  color: ${({ theme, $color }) =>
    $color === 'primary' || $color === 'black'
      ? theme.colors.white
      : theme.colors.text.primary};
  background-color: ${({ $color }) => colorMap[$color]['background']};
  border-radius: ${({ theme }) => theme.borderRadius[1]};

  &.MuiChip-sizeMedium {
    ${({ theme }) => theme.typo['subtitle-2']}
    padding: 0 ${({ theme }) => theme.padding['0a']};
  }

  &.MuiChip-sizeSmall {
    ${({ theme }) => theme.typo.captionBold}
    padding: 0;
  }

  &.MuiChip-outlined {
    background-color: transparent;
    border-color: ${({ $color }) => colorMap[$color]['border']};
  }

  & span.MuiChip-label {
    padding: 0 4px;
  }
`;

type ColorMap = {
  [key in CustomColor]: {
    background: string;
    border?: string;
  };
};

function getColorMap(): ColorMap {
  const {
    red,
    deepOrange,
    orange,
    amber,
    yellow,
    lime,
    lightGreen,
    green,
    teal,
    cyan,
    lightBlue,
    blue,
    indigo,
    purple,
    deepPurple,
    pink,
    blueGrey,
    primary,
    white,
    black,
  } = theme.colors;

  return {
    primary: { background: primary.main },
    white: { background: white },
    black: { background: black },
    'blueGrey-100': { background: blueGrey[100], border: blueGrey[300] },
    'blueGrey-200': { background: blueGrey[200] },
    'red-100': { background: red[100], border: red[300] },
    'deepOrange-100': { background: deepOrange[100] },
    'orange-100': { background: orange[100], border: orange[300] },
    'amber-100': { background: amber[100] },
    'yellow-100': { background: yellow[100], border: yellow[300] },
    'lime-100': { background: lime[100], border: lime[300] },
    'lightGreen-100': { background: lightGreen[100], border: lightGreen[300] },
    'green-100': { background: green[100], border: green[300] },
    'teal-100': { background: teal[100] },
    'cyan-100': { background: cyan[100], border: cyan[300] },
    'lightBlue-100': { background: lightBlue[100], border: lightBlue[300] },
    'blue-100': { background: blue[100], border: blue[300] },
    'indigo-100': { background: indigo[100], border: indigo[300] },
    'deepPurple-100': { background: deepPurple[100], border: deepPurple[300] },
    'purple-100': { background: purple[100] },
    'pink-100': { background: pink[100] },
  };
}
