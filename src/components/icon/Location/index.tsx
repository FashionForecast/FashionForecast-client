import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Location from '@/assets/svg/location.svg?react';
import forwardPropOption from '@/utils/emotionForwardPropOption';

type LocationIconProps = {
  color?: 'default' | 'disabled';
};

const LocationIcon = ({ color = 'default' }: LocationIconProps) => {
  return <LocationSvg $color={color} />;
};

export default LocationIcon;

const LocationSvg = styled(Location, forwardPropOption)<{
  $color: LocationIconProps['color'];
}>`
  ${({ theme, $color }) => {
    let fill;

    switch ($color) {
      case 'disabled':
        fill = `${theme.colors.blueGrey.A38}`;
        break;
      default:
        fill = `${theme.colors.text.primary}`;
    }

    return css`
      fill: ${fill};
    `;
  }}
`;
