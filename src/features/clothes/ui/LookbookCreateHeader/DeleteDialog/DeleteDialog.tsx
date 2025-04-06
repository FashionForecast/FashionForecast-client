import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { deleteLookbook } from '@/features/clothes/lib/deleteLookbook';

import { LookbookCreatePageState } from '@/entities/clothes';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { Dialog, Button } from '@/shared/ui';

type DeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteDialog = ({ isOpen, onClose }: DeleteDialogProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);

  const pageState: LookbookCreatePageState = useLocation().state;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const pageStateOutfit = pageState?.clickedOutfit;

  const { mutate } = useMutation({
    mutationFn: () => deleteLookbook(pageStateOutfit, accessToken),
  });

  const handleDeleteButtonClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate(pageState?.referrer ? pageState.referrer : '/user');
      },
      onError: () => snackbar.open('해당 룩북을 삭제 할 수 없습니다.'),
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      contentSlot={'정말 삭제하시겠습니까?'}
      actionsSlot={
        <>
          <Button color='inherit' variant='outlined' onClick={onClose}>
            취소
          </Button>
          <Button
            color='error'
            variant='contained'
            disabled={isLoading}
            onClick={handleDeleteButtonClick}
          >
            삭제
          </Button>
        </>
      }
    />
  );
};
