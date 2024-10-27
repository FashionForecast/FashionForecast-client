import { useState } from 'react';
import MenuItem from '../MenuItem';
import LogoutIcon from '@/assets/svg/logout.svg?react';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import { DialogActions, DialogContent } from '@mui/material';
import CustomButton from '@/components/CustomMui/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/service/auth';
import useAppSelector from '@/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '@/constants/localStorage/key';

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
