import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Button, Icon } from '@mui/material';

const TimeSelector = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 768px;
  margin: 0;
  border: 1px 0 0 0;
  border-color: ${colors.blueGrey[600]};
  transform: translateX(-50%);
`;

const TimeRange = styled.div`
  position: relative; /* relative positioning 추가 */
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${colors.white};
  box-shadow: none;
`;

const DayList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
  height: 40px; /* 보여질 스크롤 높이 */
  padding: 8px 0;
  overflow-y: auto;
  background-color: ${colors.blueGrey['A06']};
  border: none;
  border-radius: 4px;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const TimeList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40%;
  height: 40px; /* 보여질 스크롤 높이 */
  padding: 8px 0;
  overflow-y: auto;
  background-color: ${colors.blueGrey['A06']};
  border: none;
  border-radius: 4px;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Times = styled.li`
  width: 100%;
  height: 24px;
  text-align: center;
  opacity: 0.5;
  scroll-snap-align: center;

  &.highlight {
    opacity: 1;
  }

  @media (max-width: 600px) {
    ${({ theme }) => theme.typo['body-2']};
    line-height: 1.5;
  }
`;

const CheckButton = styled(Button)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 8px;
  background-color: ${({ disabled }) =>
    disabled ? colors.blueGrey['A12'] : colors.blueGrey[600]};
  border-radius: 4px;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? colors.blueGrey['A12'] : colors.blueGrey[700]};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.blueGrey['A12']};
    box-shadow: none;
  }
`;

const CheckIcon = styled(Icon)`
  color: ${({ disabled }) =>
    disabled ? colors.blueGrey['A12'] : colors.white};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const C = {
  CheckButton,
  CheckIcon,
};

export const S = {
  TimeSelector,
  TimeRange,
  DayList,
  TimeList,
  Times,
};
