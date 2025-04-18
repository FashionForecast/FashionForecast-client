import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { HEADLINE_HEIGHT } from '@/pages/LookbookCreate';

import { HEADER_HEIGHT, MAX_WIDTH } from '@/shared/consts';
import { ToggleButton } from '@/shared/ui';

import {
  DRAGGABLE_AREA_HEIGHT,
  SELECT_CLOTHES_BUTTON_WRAP_HEIGHT,
  SHOWCASE_HEIGHT,
} from '../../model/consts';

const DrawerWrap = styled.aside<{
  $isDragging: boolean;
  $dragDistance: number;
}>`
  position: fixed;
  top: calc(${HEADER_HEIGHT} + ${HEADLINE_HEIGHT} + ${SHOWCASE_HEIGHT});
  z-index: 300;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MAX_WIDTH};
  touch-action: none;
  user-select: none;
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
  top: calc(-${SELECT_CLOTHES_BUTTON_WRAP_HEIGHT} + 6px);
  width: 100%;
  height: calc(${SELECT_CLOTHES_BUTTON_WRAP_HEIGHT} + 6px);
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

const Drawer = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%);
`;

const DraggableArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${DRAGGABLE_AREA_HEIGHT};
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

const INITIAL_HEIGHT = `100dvh - ${HEADER_HEIGHT} - ${HEADLINE_HEIGHT} - ${SHOWCASE_HEIGHT} - ${DRAGGABLE_AREA_HEIGHT}`;
const ContentWrap = styled.div`
  width: 100%;
  height: calc(${INITIAL_HEIGHT});
  padding: 8px 16px;
  overflow-y: scroll;
`;

const PaletteWrap = styled.div`
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 45px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 8px 0;

  @media (min-width: 480px) {
    grid-template-columns: repeat(6, 50px);
    justify-content: center;
  }
`;

export const S = {
  DrawerWrap,
  SelectClothesButtonWrap,
  Drawer,
  DraggableArea,
  HandleBar,
  ButtonGroup,
  ContentWrap,
  PaletteWrap,
};

export const C = {
  SliderButton,
};
