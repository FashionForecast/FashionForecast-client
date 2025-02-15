import { useState } from 'react';
import MenuItem from '../components/MenuItem/MenuItem';
import { CustomDialog } from '@/shared/ui';
import { DialogActions, DialogContent } from '@mui/material';
import { CustomButton } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/entities/auth/api/auth';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '@/shared/consts';
import { LogoutIcon } from '@/shared/ui';

const LogoutMenu = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { mutate } = useMutation({ mutationFn: () => logout(accessToken) });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    mutate(undefined, {
      onSettled: () => {
        localStorage.removeItem(LOGIN);
        navigate('/');
        navigate(0);
      },
    });
  };

  return (
    <>
      <MenuItem
        title='로그아웃'
        icon={<LogoutIcon />}
        handleClick={handleClickOpen}
      />

      <CustomDialog fullWidth onClose={handleClose} open={open}>
        <DialogContent>정말 로그아웃하시겠습니까?</DialogContent>
        <DialogActions>
          <CustomButton
            color='inherit'
            variant='outlined'
            onClick={handleClose}
          >
            취소
          </CustomButton>
          <CustomButton variant='contained' onClick={handleLogoutClick}>
            로그아웃
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default LogoutMenu;
