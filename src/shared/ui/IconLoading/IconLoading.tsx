import { css } from '@emotion/react';
import styled from '@emotion/styled';

type IconLoadingProps = {
  $width: number;
  $height: number;
};

export const IconLoading = ({ $width, $height }: IconLoadingProps) => {
  return <Loading width={$width} height={$height} />;
};

const Loading = styled.div<{ width: number; height: number }>`
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;
