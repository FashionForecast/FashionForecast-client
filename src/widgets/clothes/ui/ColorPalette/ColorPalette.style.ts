import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { MAX_WIDTH } from '@/shared/consts';
import { ToggleButton } from '@/shared/ui';

const Drawer = styled.div<{ $isDragging: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 300;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MAX_WIDTH};
  height: calc(100dvh - 56px - 72px - 8px - 320px);
  min-height: calc(100dvh - 56px - 72px - 8px - 320px);
  max-height: calc(100dvh - 56px - 72px - 8px);
  font-size: 18px;
  touch-action: none;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%);
  transition: height 0.6s ease-out;
  transform: translateX(-50%);

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      transition: none;
    `}
`;

const ColorPaletteWrap = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

const DraggableArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: none;
  cursor: grab;
  user-select: none;
`;

const HandleBar = styled.div<{ $isDraggable: boolean }>`
  width: 30px;
  height: 6px;
  margin: 8px 0 4px;
  background-color: ${({ theme }) => theme.colors.blueGrey[300]};
  border-radius: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;

const SliderButton = styled(ToggleButton)`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 0;
`;

const PaletteWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 8px 8px 16px;
  overflow-y: auto;

  @media (min-width: 480px) {
    grid-template-columns: repeat(6, 52px);
    justify-content: center;
  }
`;

export const S = {
  ColorPaletteWrap,
  HandleBar,
  DraggableArea,
  ButtonGroup,
  PaletteWrap,
  Drawer,
};

export const C = {
  SliderButton,
};
