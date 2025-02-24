import styled from '@emotion/styled';
import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';

type MuiTabsProps = React.ComponentProps<typeof MuiTabs>;

type CustomTabsProps = MuiTabsProps & {
  labels: string[];
};

/**
 * - labels - 탭의 label 목록
 * - value - 선택된 탭의 value
 * - onChange - 탭 변경 시 호출되는 callback 함수
 * - 이외의 props - [MuiTabs](https://mui.com/material-ui/api/tabs/)
 */
export const Tabs = ({ labels, value, onChange, ...rest }: CustomTabsProps) => {
  return (
    <BaseTabs value={value} onChange={onChange} {...rest}>
      {labels.map((label) => (
        <BaseTab key={label} label={label} value={label} />
      ))}
    </BaseTabs>
  );
};

const BaseTabs = styled(MuiTabs)`
  min-height: auto;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};

  & .MuiTabs-indicator {
    display: none;
  }
`;

const BaseTab = styled(MuiTab)`
  display: inline-flex;
  min-width: auto;
  height: 40px;
  min-height: auto;
  padding: 0 6px;
  font-size: 20px;
  line-height: 24px;

  &.Mui-selected {
    font-weight: 800;
  }
`;
