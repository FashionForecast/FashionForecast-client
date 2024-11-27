import { css } from '@emotion/react';
import styled from '@emotion/styled';

type IconLoadingProps = {
  $width: number;
  $height: number;
};

const IconLoading = ({ $width, $height }: IconLoadingProps) => {
  return <Loading width={$width} height={$height} />;
};

export default IconLoading;

const Loading = styled.div<{ width: number; height: number }>`
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;
