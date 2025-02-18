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

const backgroundColorMap = getBackgroundColorMap();

export const ToggleButton = ({
  color = 'neutral',
  ...rest
}: CustomToggleButtonProps) => {
  return <BaseToggleButton $color={color} {...rest} />;
};

const BaseToggleButton = styled(MuiToggleButton, forwardPropOption)<{
  $color: CustomColor;
}>`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ $color }) => backgroundColorMap[$color]['enabled']};
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
    background-color: ${({ $color }) => backgroundColorMap[$color]['disabled']};
    border: 0;
  }

  &.Mui-selected {
    font-weight: 700;
    color: ${({ theme, $color }) =>
      $color === 'neutral' ? theme.colors.primary.dark : theme.colors.white};
    background-color: ${({ $color }) => backgroundColorMap[$color]['selected']};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${({ $color }) =>
          backgroundColorMap[$color]['hover']};
      }
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ $color }) => backgroundColorMap[$color]['hover']};
    }
  }
`;

function getBackgroundColorMap() {
  const { primaryState, blueGrey, red, blue, primary, info, error, action } =
    theme.colors;

  return {
    neutral: {
      enabled: 'transparent',
      hover: primaryState.hover,
      selected: 'transparent',
      disabled: 'transparent',
    },
    primary: {
      enabled: blueGrey[200],
      hover: blueGrey[300],
      selected: primary.main,
      disabled: action.disabledBackground,
    },
    blue: {
      enabled: blue[200],
      hover: blue[300],
      selected: info.main,
      disabled: action.disabledBackground,
    },
    red: {
      enabled: red[200],
      hover: red[300],
      selected: error.main,
      disabled: action.disabledBackground,
    },
  };
}
