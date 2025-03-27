import styled from '@emotion/styled';
import { Menu as MuiMenu } from '@mui/material';

type MenuProps = React.ComponentProps<typeof MuiMenu>;

type CustomMenuProps = MenuProps;

/**
 * - anchorEl - 메뉴의 위치를 설정하기 위한 HTML Element
 * - open - 렌더링 여부
 * - onClose - 닫기 요청 시 실행되는 callback 함수
 * - 이외의 props - [MuiMenu](https://mui.com/material-ui/api/menu/)
 * 
 * @example
 * const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };
 */
export const Menu = ({
  anchorEl,
  open,
  onClose,
  children,
  ...rest
}: CustomMenuProps) => {
  return (
    <BaseMenu anchorEl={anchorEl} open={open} onClose={onClose} {...rest}>
      {children}
    </BaseMenu>
  );
};

const BaseMenu = styled(MuiMenu)`
  & .MuiPaper-root {
    border-radius: ${({ theme }) => theme.borderRadius[2]};
  }
`;
