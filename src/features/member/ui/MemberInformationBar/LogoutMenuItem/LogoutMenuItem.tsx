import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/entities/auth';

import { LOGIN } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib';
import { Button, Dialog, MenuItem } from '@/shared/ui';

export const LogoutMenuItem = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => logout(accessToken),
  });

  const handleLogoutClick = () => {
    mutate(undefined, {
      onSettled: () => {
        localStorage.removeItem(LOGIN);
        navigate('/');
        navigate(0);
      },
    });
  };

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  return (
    <>
      <MenuItem onClick={handleDialogToggle}>로그아웃</MenuItem>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogToggle}
        contentSlot={'정말 로그아웃하시겠습니까?'}
        actionsSlot={
          <>
            <Button variant='outlined' onClick={handleDialogToggle}>
              취소
            </Button>
            <Button onClick={handleLogoutClick}>로그아웃</Button>
          </>
        }
      />
    </>
  );
};
