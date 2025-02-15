import { AppBarOwnProps } from '@mui/material';

import { CustomPaper } from '../CustomMui/CustomPaper';
import { CustomToolbar } from '../CustomMui/CustomToolbar';

import { C } from './Header.style';

export type HeaderColor = 'blueGrey' | 'white';
export type HeaderPosition = Extract<
  AppBarOwnProps['position'],
  'relative' | 'fixed'
>;

type HeaderProps = {
  color?: HeaderColor;
  position?: HeaderPosition;
  children: React.ReactNode;
};

export const Header = ({
  color = 'blueGrey',
  position = 'relative',
  children,
}: HeaderProps) => {
  return (
    <C.AppBar $color={color} $position={position}>
      <CustomPaper>
        <CustomToolbar>{children}</CustomToolbar>
      </CustomPaper>
    </C.AppBar>
  );
};
