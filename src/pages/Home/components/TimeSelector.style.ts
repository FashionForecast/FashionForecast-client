import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { ListItemText, Button, List, Icon, ListItem } from '@mui/material';
import shouldForwardProp from '@emotion/is-prop-valid';

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

const DayScroll = styled.div`
  display: flex;
  flex-direction: column; /* 수직 스크롤을 위해 flex-direction을 column으로 변경 */
  justify-content: center;
  width: 20%;
  height: 40px;
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

const TimeScroll = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
  height: 40px; /* 보여질 스크롤 높이 */
  overflow-y: auto;
  background-color: ${colors.blueGrey['A06']};
  border: none;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const ItemText = styled(ListItemText)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  .MuiTypography-root {
    padding: 0;
    margin: 0;
    font-size: 14px;
    line-height: 1;
    color: ${colors.blueGrey[900]}; /* 텍스트 색상 추가 */
  }

  @media (max-width: 600px) {
    .MuiTypography-root {
      font-size: 14px;
      line-height: 1;
    }
  }
`;

const ItemList = styled(List)`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  padding: 0;
  margin: 0;
  touch-action: pan-x pinch-zoom;

  .MuiListItem-root {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
`;

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'highlighted',
})<{ highlighted: string }>`
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 0;
  padding-top: 1rem; /* 슬라이드 간 간격 */
  opacity: ${({ highlighted }) => (highlighted ? 1 : 0.5)};
  transition: opacity 0.3s ease;
  transform: translate3d(0, 0, 0);
`;

// const StyledListItem = styled(ListItem)<{ highlighted: boolean }>`
//   opacity: ${({ highlighted }) => (highlighted ? 1 : 0.5)};
//   transition: opacity 0.3s ease;
// `;
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
  ItemText,
  ItemList,
  CheckButton,
  CheckIcon,
  StyledListItem,
};

export const S = {
  TimeSelector,
  TimeRange,
  DayScroll,
  TimeScroll,
};
