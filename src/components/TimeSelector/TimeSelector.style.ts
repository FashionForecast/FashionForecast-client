import { MAX_WIDTH } from './../../constants/css';
import CustomButton from '@/components/CustomMui/CustomButton';
import styled from '@emotion/styled';
import { DayButtonType } from './TimeSelector';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import { css } from '@emotion/react';

const TimeSelectorWrap = styled.section<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 5000;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MAX_WIDTH};
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: none;
  visibility: hidden;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
  opacity: 0;
  transform: translateX(-50%);

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

const Content = styled.div`
  flex-grow: 1;
`;

const DayWrap = styled.div`
  padding: 8px 16px 0;
`;

const Heading = styled.h6`
  ${({ theme }) => theme.typo['subtitle-1']};
  font-weight: 800;
`;

const ButtonWrap = styled.div`
  padding: 8px 0;
`;

const DayButton = styled(CustomButton, forwardPropOption)<{
  $type: DayButtonType;
  $isSelected: boolean;
}>`
  width: 60px;
  min-width: 60px;
  height: 40px;
  margin-right: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary} !important;
  background-color: ${({ theme }) => theme.colors.blueGrey[200]} !important;
  border-radius: 16px;

  &:last-child {
    margin-right: 0;
  }

  ${({ $isSelected, $type, theme }) => {
    if ($isSelected) {
      return css`
        color: ${theme.colors.white} !important;
        background-color: ${theme.colors.primary.main} !important;
      `;
    }

    if ($type === '모레') {
      return css`
        background-color: ${theme.colors.blue[300]} !important;
      `;
    }
  }}
`;

const ClockWrap = styled.div`
  & h6 {
    padding: 8px 16px 0;
  }
`;

const Clock = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  overscroll-behavior: none;

  & svg,
  path {
    touch-action: none;
    user-select: none;
  }
`;

const ClockFace = styled.svg`
  user-select: none;
`;

const TimeRange = styled.circle<{ $degree: number; $range: number }>`
  stroke-dasharray: 910;
  stroke-dashoffset: calc(910 - (910 * ${({ $range }) => $range}) / 100);
  transform: rotate(${({ $degree }) => `${$degree}deg`}); /* -90deg 오전00사 */
`;

const PhraseWrap = styled.div`
  ${({ theme }) => theme.typo['body-2']};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 190px;
  color: ${({ theme }) => theme.colors.text.secondary};
  transform: translate(-50%, -50%);
`;

const DefaultPhrase = styled.p`
  text-align: center;
`;

const CountingPhraseWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-bottom: 16px;
  }
`;

const DeleteButton = styled(CustomButton)`
  padding: 8px 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary} !important;
  background-color: ${({ theme }) => theme.colors.blueGrey[200]} !important;
  border-radius: 100px;
`;

const SelectedTimeText = styled.div<{ $isDefaultTime: boolean }>`
  ${({ theme }) => theme.typo['subtitle-2']};
  margin: 24px 0 8px;
  font-weight: 700;
  text-align: center;

  ${({ $isDefaultTime, theme }) =>
    $isDefaultTime &&
    css`
      color: ${theme.colors.text.disabled};
    `};
`;

const SubmitButton = styled(CustomButton)`
  margin: 0 16px 16px;
  font-weight: 700;
  border-radius: 100px;
`;

export const S = {
  TimeSelectorWrap,
  Content,
  ClockWrap,
  Clock,
  ClockFace,
  TimeRange,
  PhraseWrap,
  DefaultPhrase,
  CountingPhraseWrap,
  ButtonWrap,
  Heading,
  DayWrap,
  SelectedTimeText,
};

export const C = {
  DeleteButton,
  DayButton,
  SubmitButton,
};
