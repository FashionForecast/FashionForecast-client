import styled from '@emotion/styled';
import { ChipProps as MuiChipProps, Chip as MuiChip } from '@mui/material';

import { forwardPropOption } from '@/shared/lib';
import { theme } from '@/shared/styles';

type ExcludedColor = Exclude<
  MuiChipProps['color'],
  'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default'
>;

type CustomColor = 'primary' | 'black' | string;

type CustomChipProps = Omit<MuiChipProps, 'color'> & {
  color?: CustomColor | string | ExcludedColor;
};

/**
 * - label - 컨텐츠 내용
 * - variant - 칩 유형
 * - color - 색상 (`primary` | `black` | string)
 * - size - 크기
 * - 이외의 props - [MuiChip](https://mui.com/material-ui/api/chip/)
 */
export const Chip = ({ color = 'primary', ...rest }: CustomChipProps) => {
  return <BaseChip $color={color} {...rest} />;
};

const darkColorMap: Record<string, string> = {
  black: theme.colors.primary.main,
  primary: theme.colors.black,
};

const isDarkColors = (color: CustomColor) => !!darkColorMap[color];

const BaseChip = styled(MuiChip, forwardPropOption)<{
  $color: CustomColor;
}>`
  ${({ theme }) => theme.typo['subtitle-2']}
  height: 24px;
  color: ${({ theme, $color }) =>
    isDarkColors($color) ? theme.colors.white : theme.colors.text.primary};
  background-color: ${({ $color }) =>
    isDarkColors($color) ? darkColorMap[$color] : $color};
  border-radius: ${({ theme }) => theme.borderRadius[1]};

  &.MuiChip-sizeMedium {
    padding: 0 8px;
  }

  &.MuiChip-sizeSmall {
    padding: 0 4px;
  }

  &.MuiChip-outlined {
    background-color: transparent;
    border-color: ${({ $color }) => $color};
  }

  & span.MuiChip-label {
    padding: 2px 0;
  }
`;
