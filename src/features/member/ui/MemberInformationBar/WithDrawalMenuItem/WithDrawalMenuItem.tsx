import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { withdrawalAccount } from '@/features/member/api/member';

import { LOGIN } from '@/shared/consts';
import { useAppSelector, useSnackbar } from '@/shared/lib';
import { Button, Dialog } from '@/shared/ui';

import { C } from './WithdrawalMenuItem.style';

export const WithDrawalMenuItem = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => withdrawalAccount(accessToken),
  });

  const handleWithdrawalClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem(LOGIN);
        navigate('/');
        navigate(0);
      },
      onError: () => snackbar.open('탈퇴 중 오류가 발생했습니다.'),
      onSettled: () => setIsLoading(false),
    });
  };

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  return (
    <>
      <C.WithDrawalItem onClick={handleDialogToggle} disabled={isLoading}>
        회원탈퇴
      </C.WithDrawalItem>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogToggle}
        contentSlot={
          <p>
            정말 탈퇴하시겠습니까? <br />
            탈퇴하는 즉시 모든 정보가 삭제됩니다.
          </p>
        }
        actionsSlot={
          <>
            <Button variant='outlined' onClick={handleDialogToggle}>
              취소
            </Button>
            <Button
              color='error'
              disabled={isLoading}
              onClick={handleWithdrawalClick}
            >
              탈퇴
            </Button>
          </>
        }
      />
    </>
  );
};
