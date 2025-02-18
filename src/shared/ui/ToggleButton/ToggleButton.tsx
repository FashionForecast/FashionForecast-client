import styled from '@emotion/styled';
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonOwnProps,
} from '@mui/material';

import { forwardPropOption } from '@/shared/lib';
import { theme } from '@/shared/styles';

type ExcludedColor = Exclude<
  ToggleButtonOwnProps['color'],
  'secondary' | 'error' | 'info' | 'success' | 'warning' | 'standard'
>;

type CustomColor = 'neutral' | 'primary' | 'blue' | 'red';

type CustomToggleButtonProps = Omit<ToggleButtonOwnProps, 'color'> & {
  color?: CustomColor | ExcludedColor;
};

const colorMap = getColorMap();

export const ToggleButton = ({
  color = 'neutral',
  ...rest
}: CustomToggleButtonProps) => {
  return <BaseToogleButton $color={color} {...rest} />;
};

const BaseToogleButton = styled(MuiToggleButton, forwardPropOption)<{
  $color: CustomColor;
}>`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ $color }) => colorMap[$color]['background']};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius[2]};

  &.MuiToggleButton-sizeLarge {
    ${({ theme }) => theme.typo['body-1']}
    height: 40px;
    padding: ${({ theme }) => `${theme.padding[1]} ${theme.padding['1a']}`};
  }

  &.MuiToggleButton-sizeMedium {
    height: 32px;
    padding: ${({ theme }) => `${theme.padding['0a']} ${theme.padding['1a']}`};
  }

  &.MuiToggleButton-sizeSmall {
    height: 24px;
    padding: ${({ theme }) => `${theme.padding[0]} ${theme.padding[1]}`};
  }

  &.Mui-disabled {
    background-color: ${({ $color }) => colorMap[$color]['disabled']};
    border: 0;
  }

  &.Mui-selected {
    font-weight: 700;
    color: ${({ theme, $color }) =>
      $color === 'neutral' ? theme.colors.primary.dark : theme.colors.white};
    background-color: ${({ $color }) => colorMap[$color]['selected']};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ $color }) => colorMap[$color]['hover']};
      }
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ $color }) => colorMap[$color]['hover']};
    }
  }
`;

function getColorMap() {
  const { primaryState, blueGrey, red, blue, primary, info, error, action } =
    theme.colors;

  return {
    neutral: {
      background: 'trasnparent',
      hover: primaryState.hover,
      selected: 'transparent',
      disabled: 'transparent',
    },
    primary: {
      background: blueGrey[200],
      hover: blueGrey[300],
      selected: primary.main,
      disabled: action.disabledBackground,
    },
    blue: {
      background: blue[200],
      hover: blue[300],
      selected: info.main,
      disabled: action.disabledBackground,
    },
    red: {
      background: red[200],
      hover: red[300],
      selected: error.main,
      disabled: action.disabledBackground,
    },
  };
}
