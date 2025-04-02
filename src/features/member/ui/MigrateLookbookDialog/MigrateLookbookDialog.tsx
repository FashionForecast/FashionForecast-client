import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { GUEST_UUID } from '@/shared/consts';
import { GUEST_OUTFIT } from '@/shared/consts/localStorageKey';
import { useAppSelector, useSnackbar } from '@/shared/lib';
import { Button, Dialog } from '@/shared/ui';

import { migrateLookbookList } from '../../api/member';

export const MigrateLookbookDialog = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem(GUEST_OUTFIT) ?? 'false')
  );
  const [isLoading, setIsLoading] = useState(false);
  const snackbar = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => migrateLookbookList(accessToken),
  });

  const queryClient = useQueryClient();

  const handleDialogClose = () => {
    setIsDialogOpen((prev) => !prev);
    localStorage.removeItem(GUEST_OUTFIT);
  };

  const handleLookbookTransferClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        localStorage.removeItem(GUEST_UUID);
        handleDialogClose();
      },
      onError: () => snackbar.open('오류가 발생했어요.'),
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      contentSlot={<p>기기에 등록된 룩북을 이 계정으로 가져올까요?</p>}
      actionsSlot={
        <>
          <Button variant='outlined' onClick={handleDialogClose}>
            취소
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleLookbookTransferClick}
            loading={isLoading}
          >
            확인
          </Button>
        </>
      }
    />
  );
};
