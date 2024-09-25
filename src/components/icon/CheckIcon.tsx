import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Check from '@/assets/svg/check.svg?react';
import forwardPropOption from '@/utils/emotionForwardPropOption';

type Color = 'default' | 'white' | 'disabled';

type CheckIconProps = {
  color?: Color;
};

const CheckIcon = ({ color = 'default' }: CheckIconProps) => {
  return <CheckSVG $color={color} />;
};

export default CheckIcon;

const CheckSVG = styled(Check, forwardPropOption)<{ $color: Color }>`
  ${({ $color, theme }) => {
    let fill;

    switch ($color) {
      case 'white':
        fill = theme.colors.white;
        break;
      case 'disabled':
        fill = theme.colors.action.disabled;
        break;
      default:
        fill = theme.colors.action.active;
    }

    return css`
      fill: ${fill};
    `;
  }}
`;
