import Close from '@/assets/svg/close.svg?react';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Color = 'gray' | 'black';

type CloseIconProps = {
  color?: Color;
};

const CloseIcon = ({ color = 'gray' }: CloseIconProps) => {
  return <CheckSVG $color={color} />;
};

export default CloseIcon;

const CheckSVG = styled(Close, forwardPropOption)<{ $color: Color }>`
  ${({ $color, theme }) => {
    let fill;

    switch ($color) {
      case 'black':
        fill = theme.colors.text.primary;
        break;
      default:
        fill = theme.colors.blueGrey.A56;
    }

    return css`
      fill: ${fill};
    `;
  }}
`;
