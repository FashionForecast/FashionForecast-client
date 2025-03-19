import styled from '@emotion/styled';
import { AppBar as MuiAppBar } from '@mui/material';

import { MAX_WIDTH } from '@/shared/consts';

type AppBarProps = React.ComponentProps<typeof MuiAppBar>;

type CustomHeaderProps = AppBarProps & {
  leftSlot?: React.ReactNode;
  centerTitle?: string;
  rightSlot?: React.ReactNode;
};

/**
 * - leftSlot - 왼쪽 슬롯
 * - centerTitle - 중앙 타이틀
 * - rightSlot - 오른쪽 슬롯
 * - 이외의 props - [MuiAppBar](https://mui.com/material-ui/api/app-bar/)
 */
export const Header = ({
  leftSlot,
  centerTitle,
  rightSlot,
  ...rest
}: CustomHeaderProps) => {
  return (
    <BaseAppBar position='relative' elevation={0} {...rest}>
      {leftSlot}
      {centerTitle && <h2 className='centerTitle'>{centerTitle}</h2>}
      {rightSlot}
    </BaseAppBar>
  );
};

const BaseAppBar = styled(MuiAppBar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 16px;
  padding-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};

  &.MuiAppBar-positionFixed {
    left: 50%;
    max-width: ${MAX_WIDTH};
    transform: translateX(-50%);
  }

  & .centerTitle {
    ${({ theme }) => theme.typo['subtitle-1']}
    position: absolute;
    left: 50%;
    color: ${({ theme }) => theme.colors.text.primary};
    transform: translateX(-50%);
  }
`;
