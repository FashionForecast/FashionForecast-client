import styled from '@emotion/styled';
import { MenuItem as MuiMenuItem } from '@mui/material';

type MenuItemProps = React.ComponentProps<typeof MuiMenuItem>;

/**
 * - onClick - 클릭 요청 시 실행되는 callback 함수
 * - 이외의 props - [MuiMenuItem](https://mui.com/material-ui/api/menu-item/)
 */
export const MenuItem = ({ onClick, children, ...rest }: MenuItemProps) => {
  return (
    <BaseMenuItem onClick={onClick} {...rest}>
      {children}
    </BaseMenuItem>
  );
};

const BaseMenuItem = styled(MuiMenuItem)`
  ${({ theme }) => theme.typo['body-2']};
  min-height: 32px;
  color: ${({ theme }) => theme.colors.text.primary};
`;
