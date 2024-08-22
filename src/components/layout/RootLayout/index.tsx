import { Outlet } from 'react-router-dom';
import * as S from './style';

import { MY_REGIONS } from '@/constants/localStorage/key';

export default function RootLayout() {
  setDefaultRegion();

  return (
    <S.Main>
      <Outlet />
    </S.Main>
  );
}

function setDefaultRegion() {
  const saved = localStorage.getItem(MY_REGIONS);

  if (!saved) {
    localStorage.setItem(
      MY_REGIONS,
      JSON.stringify([{ region: '서울특별시 종로구', nx: 37, ny: 126 }])
    );
  }
}
