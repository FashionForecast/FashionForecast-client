import { DialogActions, DialogContent } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSnackbar } from '@/app/providers/SnackbarProvider';

import { LocationState } from '@/pages/UserLookbookCreate/ui/Page/UserLookbookCreatePage';

import { deleteLookbookItem } from '@/entities/clothes';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { CustomDialog, Button } from '@/shared/ui';

type DeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteDialog = ({ isOpen, onClose }: DeleteDialogProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  const { state }: LocationState = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () =>
      deleteLookbookItem(state?.outfit?.memberOutfitId, accessToken),
  });

  const handleClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate(state?.referrer ? state.referrer : '/user');
      },
      onError: () => openSnackbar('해당 룩북을 삭제 할 수 없습니다.'),
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <CustomDialog fullWidth onClose={onClose} open={isOpen}>
      <DialogContent>정말 삭제하시겠습니까?</DialogContent>
      <DialogActions>
        <Button color='inherit' variant='outlined' onClick={onClose}>
          취소
        </Button>
        <Button
          color='error'
          variant='contained'
          disabled={isLoading}
          onClick={handleClick}
        >
          삭제
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default DeleteDialog;
