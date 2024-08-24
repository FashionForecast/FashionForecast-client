import { Outlet } from 'react-router-dom';
import * as S from './style';
import { MY_REGIONS } from '@/constants/localStorage/key';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { guestLogin } from '@/service/login';

export default function RootLayout() {
  const { mutate: guestLoginMutate } = useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => localStorage.setItem('uuid', data.data.uuid),
  });

  useEffect(() => {
    const uuidGuest = localStorage.getItem('uuid');

    if (!uuidGuest) {
      guestLoginMutate();
    }
  }, [guestLoginMutate]);

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
