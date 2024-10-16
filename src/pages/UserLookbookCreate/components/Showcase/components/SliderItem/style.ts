import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SliderItem = styled.li<{
  $isFocussingSlider: boolean;
  $isSelected: boolean;
}>`
  position: relative;
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

  ${({ $isSelected, $isFocussingSlider, theme }) => {
    if (!$isSelected) return;

    return css`
      opacity: 1;

      & svg {
        transform: scale(1.8);
      }

      ${$isFocussingSlider &&
      css`
        &::before {
          position: absolute;
          width: 128px;
          height: 128px;
          content: '';
          background-color: ${theme.colors.white};
          border-radius: 50%;
        }
      `}
    `;
  }}
`;

export const S = {
  SliderItem,
};
