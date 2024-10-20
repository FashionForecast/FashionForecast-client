import { MAX_WIDTH } from '@/constants/css/value';
import CustomButton from '@/components/CustomMui/CustomButton';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Drawer = styled.div<{ $isDragging: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 300;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MAX_WIDTH};
  height: calc(100vh - 56px - 52px - 8px - 320px);
  min-height: calc(100vh - 56px - 52px - 8px - 320px);
  max-height: calc(100vh - 56px - 52px - 8px);
  font-size: 18px;
  touch-action: none;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  transition: height 0.6s ease-in-out;
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
`;

const DraggableArea = styled.div`
  touch-action: none;
  cursor: grab;
  user-select: none;
`;

const HandleBar = styled.div<{ $isDraggable: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;

  &::after {
    display: block;
    width: 30px;
    height: 6px;
    content: '';
    background-color: ${({ theme }) => theme.colors.blueGrey[400]};
    border-radius: 12px;
    opacity: ${({ $isDraggable }) => ($isDraggable ? 1 : 0.4)};
    transition: opacity 0.2s ease;
  }
`;

const InfoBar = styled.div`
  ${({ theme }) => theme.typo['subtitle-1']}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 4px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[600]};
  border-radius: 50%;
`;

const PaletteWrap = styled.div<{ $isColor: boolean }>`
  ${({ theme }) => theme.typo['body-2']}
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 12px 8px 16px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text.secondary};

  ${({ $isColor }) =>
    $isColor &&
    css`
      display: inline-block;
      flex-basis: 0;
    `}
`;

const ColorButton = styled(CustomButton, forwardPropOption)<{
  $color: string;
}>`
  position: relative;
  min-width: 44px;
  min-height: 42px;
  padding: 0;
  margin: 6px;

  &.MuiButton-colorPrimary {
    background-color: ${({ $color }) => $color};

    &:hover {
      background-color: ${({ $color }) => $color};
    }
  }
`;

const Mark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const S = {
  ColorPaletteWrap,
  HandleBar,
  DraggableArea,
  InfoBar,
  Info,
  Icon,
  PaletteWrap,
  ColorButton,
  Mark,
  Drawer,
};
