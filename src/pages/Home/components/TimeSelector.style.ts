import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { Snackbar, ListItemText, Button, List, Icon } from '@mui/material';

export const Floating = styled(Snackbar)`
  position: fixed;
  bottom: 0;
  left: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: none;
  padding: 0 16px;
  margin: 0;
  border: 1px 0 0 0;
  border-color: ${colors.blueGrey[600]};
  transform: translateX(-50%);
`;

export const TimeSelector = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: none;
`;
export const DayScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 20%;
  height: 40px; /* 보여질 스크롤 높이 */
  padding: 10px;
  overflow-y: auto;
  background-color: ${colors.blueGrey['A06']};
  border: none;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const TimeScroll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 40%;
  height: 40px; /* 보여질 스크롤 높이 */
  padding: 10px;
  overflow-y: auto;
  background-color: ${colors.blueGrey['A06']};
  border: none;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ItemText = styled(ListItemText)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .MuiTypography-root {
    font-size: 14px; /* 원하는 폰트 크기로 설정 */
  }
`;

export const ItemList = styled(List)`
  padding: 0; /* List의 기본 패딩 제거 */

  .MuiTypography-root {
    font-size: 14px; /* 원하는 폰트 크기로 설정 */
  }
`;

export const CheckButton = styled(Button)`
  box-sizing: border-box;
  width: 40px;
  min-width: 40px;
  height: 40px;
  padding: 8px;
  background-color: ${colors.blueGrey[600]};
  border-radius: 10;

  &:hover {
    background-color: ${colors.blueGrey[600]};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.blueGrey['A12']};
  }
`;

export const CheckIcon = styled(Icon)`
  color: ${colors.white};
`;

export const C = {
  Floating,
  ItemText,
  ItemList,
  CheckButton,
  CheckIcon,
};

export const S = {
  TimeSelector,
  DayScroll,
  TimeScroll,
};
