import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { MAX_WIDTH } from '@/shared/consts';
import { ToggleButton } from '@/shared/ui';

const Drawer = styled.div<{ $isDragging: boolean; $dragDistance: number }>`
  position: fixed;
  top: calc(56px + 80px + 278px);
  z-index: 300;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  max-width: ${MAX_WIDTH};
  font-size: 18px;
  touch-action: none;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%);
  transition: transform 0.2s ease-out;
  transform: translateY(${({ $dragDistance }) => `${$dragDistance}px`});

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      transition: none;
    `}
`;

const SelectClothesButtonWrap = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: -64px;
  width: 100%;
  height: 64px;
  padding: 8px 16px 0;
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  opacity: 0;
  transition: opacity 0.2s ease-out, visibility 0.2s ease-out;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

const ColorPaletteWrap = styled.section<{ $isDragging: boolean }>`
  position: relative;
  transition: 0.3s ease;
  transform: translateY(0);

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      transition: none;
    `}
`;

const DraggableArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  touch-action: none;
  cursor: grab;
  user-select: none;
`;

const HandleBar = styled.div`
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

const ContentWrap = styled.div`
  width: 100%;
  height: calc(100dvh - 56px - 80px - 278px - 58px);
  padding: 8px 16px;
  overflow-y: auto;
`;

const PaletteWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  align-items: start;
  justify-content: center;
  height: 100%;

  @media (min-width: 480px) {
    grid-template-columns: repeat(6, 50px);
    justify-content: center;
  }
`;

export const S = {
  ColorPaletteWrap,
  SelectClothesButtonWrap,
  HandleBar,
  DraggableArea,
  ButtonGroup,
  ContentWrap,
  PaletteWrap,
  Drawer,
};

export const C = {
  SliderButton,
};
