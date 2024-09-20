import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Button, css } from '@mui/material';
import forwardPropOption from '@/utils/emotionForwardPropOption';

const TimeSelector = styled.section`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 768px;
  touch-action: none;
  border: 1px 0 0 0;
  border-color: ${colors.blueGrey[600]};
  border-top: 1px solid ${({ theme }) => theme.colors.elevation.outlined};
  transform: translateX(-50%);
`;

const TimeRange = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${colors.white};
  box-shadow: none;
`;

const Carousel = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 10px 0;
  overflow-y: hidden;
  touch-action: none;
  cursor: grab;
  user-select: none;
  background-color: ${colors.blueGrey['A06']};
  border: none;
  border-radius: 4px;

  &:first-of-type {
    width: 40%;
    min-width: 64px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

const Item = styled.li`
  ${({ theme }) => theme.typo['body-2']}
  width: 100%;
  height: 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;

  &.is-active {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const CheckButton = styled(Button, forwardPropOption)<{ $isChange: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 4px;

  ${({ $isChange, theme }) =>
    css`
      background-color: ${$isChange
        ? theme.colors.primary.main
        : theme.colors.action.disabledBackground};

      &:hover {
        background-color: ${$isChange
          ? theme.colors.primary.main
          : theme.colors.action.disabledBackground};
      }
    `}
`;

export const C = {
  CheckButton,
};

export const S = {
  TimeSelector,
  TimeRange,
  Carousel,
  Item,
};
