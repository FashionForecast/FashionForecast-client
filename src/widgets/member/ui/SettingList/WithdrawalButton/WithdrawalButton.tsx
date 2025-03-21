import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { withdrawalAccount } from '@/entities/member';

import { LOGIN } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { Dialog, Button } from '@/shared/ui';

const WithdrawalButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => withdrawalAccount(accessToken),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWithdrawalButtonClick = () => {
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

  return (
    <>
      <Button color='inherit' onClick={handleClickOpen}>
        회원탈퇴
      </Button>

      <Dialog
        fullWidth
        onClose={handleClose}
        open={open}
        contentSlot={
          <p>
            정말 탈퇴하시겠습니까? <br />
            탈퇴하는 즉시 모든 정보가 삭제됩니다.
          </p>
        }
        actionsSlot={
          <>
            <Button color='inherit' variant='outlined' onClick={handleClose}>
              취소
            </Button>
            <Button
              color='error'
              variant='contained'
              disabled={isLoading}
              onClick={handleWithdrawalButtonClick}
            >
              탈퇴
            </Button>
          </>
        }
      />
    </>
  );
};

export default WithdrawalButton;
