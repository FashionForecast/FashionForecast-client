import CustomButton from '@/components/CustomMui/CustomButton';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import useAppSelector from '@/hooks/useAppSelector';
import { LocationState } from '@/pages/UserLookbookCreate';
import { deleteLookbook } from '@/service/clothes';
import { DialogActions, DialogContent } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
      deleteLookbook(state?.outfit?.memberOutfitId, accessToken),
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
        <CustomButton color='inherit' variant='outlined' onClick={onClose}>
          취소
        </CustomButton>
        <CustomButton
          color='error'
          variant='contained'
          disabled={isLoading}
          onClick={handleClick}
        >
          삭제
        </CustomButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default DeleteDialog;
