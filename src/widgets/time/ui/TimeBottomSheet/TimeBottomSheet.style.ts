import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { MAX_WIDTH } from '@/shared/consts';

const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 12px 16px 16px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.blueGrey[50]};
  border-top-left-radius: ${({ theme }) => theme.borderRadius[2]};
  border-top-right-radius: ${({ theme }) => theme.borderRadius[2]};
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%);
`;

const RangesWrap = styled.div<{ $isCompactRanges: boolean }>`
  ${({ theme }) => theme.typo['subtitle-2']}
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  user-select: none;

  ${({ $isCompactRanges }) =>
    !$isCompactRanges &&
    css`
      flex-direction: column;
      align-items: center;
    `}
`;

const TimeText = styled.span<{ $isCompactRanges: boolean }>`
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.primary.main};

  &:last-of-type {
    margin-right: 0;
  }

  &:first-of-type {
    color: ${({ $isCompactRanges, theme }) =>
      !$isCompactRanges && theme.colors.text.primary};
  }
`;

const Backdrop = styled.div<{ $isBackdropOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.blueGrey.A30};
  opacity: 0;
  transition: visibility 0.2s ease, opacity 0.2s ease;

  ${({ $isBackdropOpen }) =>
    $isBackdropOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const S = { BottomSheet, RangesWrap, TimeText, Backdrop };
