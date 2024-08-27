import { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type LocationIconProps = {
  color?: 'default' | 'disabled';
};

const LocationIcon = ({ color = 'default' }: LocationIconProps) => {
  return (
    <SVG
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='20'
      viewBox='0 0 14 20'
      fill='none'
      $color={color}
    >
      <path
        d='M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z'
        fill='current'
      />
    </SVG>
  );
};

export default LocationIcon;

const SVG = styled.svg<{
  $color: LocationIconProps['color'];
}>`
  ${({ theme, $color }) => css`
    fill: ${getColorStyle(theme, $color)};
  `}
`;

function getColorStyle(theme: Theme, $color: LocationIconProps['color']) {
  let fill;

  switch ($color) {
    case 'disabled':
      fill = `${theme.colors.blueGrey.A38}`;
      break;
    default:
      fill = `${theme.colors.text.primary}`;
      break;
  }

  return fill;
}
