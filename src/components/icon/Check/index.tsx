import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Color = 'default' | 'white' | 'disabled';

type CheckIconProps = {
  color?: Color;
};

const CheckIcon = ({ color = 'default' }: CheckIconProps) => {
  return (
    <SVG
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      $color={color}
    >
      <path
        d='M8.79508 15.875L4.62508 11.705L3.20508 13.115L8.79508 18.705L20.7951 6.70504L19.3851 5.29504L8.79508 15.875Z'
        fill='current'
      />
    </SVG>
  );
};

export default CheckIcon;

const SVG = styled.svg<{ $color: Color }>`
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
