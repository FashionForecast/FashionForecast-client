import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SliderList = styled.ol<{ $isFocussingSlider: boolean }>`
  position: relative;
  z-index: ${({ $isFocussingSlider }) => ($isFocussingSlider ? 50 : 30)};
  align-items: center;
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
        z-index: 70;
        transform: scale(1.8);
      }
    `}
`;

const FocussingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 128px;
  height: 128px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

export const S = {
  SliderList,
  SliderItem,
  FocussingCircle,
};
