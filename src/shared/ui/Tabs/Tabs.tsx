import styled from '@emotion/styled';
import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';

type MuiTabsProps = React.ComponentProps<typeof MuiTabs>;

type CustomTabsProps = MuiTabsProps & {
  items: { title: string; value: string }[];
};

/**
 * - items - 탭의 목록들
 * - value - 선택된 탭의 value
 * - onChange - 탭 변경 시 호출되는 callback 함수
 * - 이외의 props - [MuiTabs](https://mui.com/material-ui/api/tabs/)
 */
export const Tabs = ({ items, value, onChange, ...rest }: CustomTabsProps) => {
  return (
    <BaseTabs value={value} onChange={onChange} {...rest}>
      {items.map(({ title, value }) => (
        <BaseTab key={title} label={title} value={value} />
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
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
