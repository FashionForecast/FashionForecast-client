import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SliderItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 128px;
  height: 128px;
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

export const S = {
  SliderItem,
};
