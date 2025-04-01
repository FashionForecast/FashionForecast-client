import { css } from '@emotion/react';
import styled from '@emotion/styled';

const WeatherTimeLineWrap = styled.div`
  flex-grow: 1;
  padding: 12px 16px 16px;
`;

const TimeLineList = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

const TimeLineItem = styled.li<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;

  ${({ $isActive }) =>
    !$isActive &&
    css`
      opacity: 0.38;
    `}
`;

const Time = styled.time`
  ${({ theme }) => theme.typo['body-2']};
  flex-shrink: 0;
  min-width: 60px;
  margin-right: 4px;
`;

const WeatherIconWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 0 8px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
`;

const Temperature = styled.span`
  ${({ theme }) => theme.typo['body-1']};
  ${({ theme }) => theme.colors.text.primary};
`;

const DialogContentItem = styled.li`
  display: flex;
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }

  & > svg {
    flex-shrink: 0;
  }
`;

const DialogContentDescription = styled.div`
  margin-left: 8px;
`;

export const S = {
  WeatherTimeLineWrap,
  TimeLineList,
  TimeLineItem,
  Time,
  WeatherIconWrap,
  Line,
  Temperature,
  DialogContentItem,
  DialogContentDescription,
};
