import CustomButton from '@/components/CustomMui/CustomButton';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import { LOGIN } from '@/constants/localStorageKey';
import { useSnackbar } from '@/app/providers/SnackbarProvider';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { withdrawlAccount } from '@/services/auth';
import { DialogActions, DialogContent } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithdrawlButton = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => withdrawlAccount(accessToken),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWithdrawlButtonClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem(LOGIN);
        navigate('/');
        navigate(0);
      },
      onError: () => openSnackbar('탈퇴 중 오류가 발생했습니다.'),
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <>
      <CustomButton color='inherit' onClick={handleClickOpen}>
        회원탈퇴
      </CustomButton>

      <CustomDialog fullWidth onClose={handleClose} open={open}>
        <DialogContent>
          정말 탈퇴하시겠습니까? <br /> 탈퇴하는 즉시 모든 정보가 삭제됩니다.
        </DialogContent>
        <DialogActions>
          <CustomButton
            color='inherit'
            variant='outlined'
            onClick={handleClose}
          >
            취소
          </CustomButton>
          <CustomButton
            color='error'
            variant='contained'
            disabled={isLoading}
            onClick={handleWithdrawlButtonClick}
          >
            탈퇴
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default WithdrawlButton;
