import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Chip } from '@/shared/ui';

const SliderList = styled.ol<{ $zIndex?: number | boolean }>`
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
`;

const SliderItem = styled.li<{
  $isSelected: boolean;
}>`
  position: relative;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  height: 128px;
  cursor: grab;
  opacity: 0.4;
  transition: opacity 0.3s ease;

  & svg {
    transition: transform 0.3s ease;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      opacity: 1;

      & svg {
        transform: scale(1.8);
      }
    `}
`;

const FocussingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.blueGrey[300]};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const NameChip = styled(Chip)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const S = {
  SliderList,
  SliderItem,
  FocussingCircle,
};

export const C = {
  NameChip,
};
