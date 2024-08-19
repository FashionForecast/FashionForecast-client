import { Outlet } from 'react-router-dom';
import * as S from './style';

export default function RootLayout() {
  return (
    <S.Main>
      <Outlet />
    </S.Main>
  );
}
