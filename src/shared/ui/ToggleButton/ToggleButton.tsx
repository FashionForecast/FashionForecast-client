import styled from '@emotion/styled';
import {
  css,
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
  clickableDisabled?: boolean;
};

const backgroundColorMap = getBackgroundColorMap();

/**
 * - value - ToggleButton value
 * - color - 색상
 * - selected - 선택 상태
 * - size - 크기
 * - clickableDisabled - 클릭 가능한 disabled 버튼
 * - 이외의 props - [MuiToggleButton](https://mui.com/material-ui/api/toggle-button/)
 */
export const ToggleButton = ({
  color = 'neutral',
  clickableDisabled = false,
  children,
  ...rest
}: CustomToggleButtonProps) => {
  return (
    <BaseToggleButton
      $color={color}
      $clickableDisabled={clickableDisabled}
      {...rest}
    >
      {children}
    </BaseToggleButton>
  );
};

const BaseToggleButton = styled(MuiToggleButton, forwardPropOption)<{
  $color: CustomColor;
  $clickableDisabled: boolean;
}>`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ $color }) => backgroundColorMap[$color]['enabled']};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius[2]};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ $color }) => backgroundColorMap[$color]['hover']};
    }
  }

  ${({ $clickableDisabled, theme }) =>
    $clickableDisabled &&
    css`
      color: ${theme.colors.text.disabled};
      cursor: auto;

      &:hover {
        background-color: transparent;
      }

      & span {
        display: none;
      }
    `}

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

  &.MuiToggleButton-root.Mui-selected {
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
