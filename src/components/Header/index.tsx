import CustomToolbar from '../CustomMui/CustomToolbar';
import { C } from './style';
import CustomPaper from '../CustomMui/CustomPaper';

export type HeaderColor = 'blueGrey' | 'white';

type HeaderProps = {
  color?: HeaderColor;
  children: React.ReactNode;
};

const Header = ({ color = 'blueGrey', children }: HeaderProps) => {
  return (
    <C.AppBar position='relative' $color={color}>
      <CustomPaper>
        <CustomToolbar>{children}</CustomToolbar>
      </CustomPaper>
    </C.AppBar>
  );
};

export default Header;
