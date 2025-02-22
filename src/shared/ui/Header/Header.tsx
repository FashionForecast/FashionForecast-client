import styled from '@emotion/styled';
import { AppBar as MuiAppBar } from '@mui/material';

type AppBarProps = React.ComponentProps<typeof MuiAppBar>;

type CustomHeaderProps = AppBarProps & {
  leftSlot?: React.ReactNode;
  centerTitle?: string;
  rightSlot?: React.ReactNode;
};

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

  & .centerTitle {
    ${({ theme }) => theme.typo['subtitle-1']}
    position: absolute;
    left: 50%;
    color: ${({ theme }) => theme.colors.text.primary};
    transform: translateX(-50%);
  }
`;
