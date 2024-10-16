import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SliderList = styled.ol`
  align-items: center;
`;

const ClothesItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  height: 128px;
  opacity: 0.4;
  transition: opacity 0.3s ease, margin 0.3s ease;

  & svg {
    transition: transform 0.3s ease;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      margin: 0 16px;
      opacity: 1;

      & svg {
        transform: scale(1.8);
      }
    `}
`;

export const S = {
  SliderList,
  ClothesItem,
};
