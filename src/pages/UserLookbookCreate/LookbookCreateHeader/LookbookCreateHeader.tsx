import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { saveLookbook } from '@/entities/clothes';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { WeatherType } from '@/shared/types';
import { GoBackButton, Header } from '@/shared/ui';

import {
  LocationState,
  LookbookSelect,
} from '../ui/Page/UserLookbookCreatePage';

import DeleteDialog from './DeleteDialog/DeleteDialog';
import { C } from './LookbookCreateHeader.style';

type LookbookCreateHeaderProps = {
  weatherType: WeatherType;
  select: LookbookSelect;
};

const LookbookCreateHeader = ({
  weatherType,
  select,
}: LookbookCreateHeaderProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { state }: LocationState = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () =>
      saveLookbook(
        weatherType,
        select,
        accessToken,
        state?.outfit?.memberOutfitId
      ),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const handleSaveButtonClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: () => navigate(state?.referrer ? state.referrer : '/user'),
      onError: (error) => {
        if (error.message.includes('M003')) {
          snackbar.open('5개 이상 저장할 수 없습니다.');
          return;
        }

        snackbar.open('저장에 실패했습니다.');
      },
      onSettled: () => setIsLoading(false),
    });
  };

  const handleDeleteButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header
        leftSlot={
          <Link to={state?.referrer ? state.referrer : '/user'}>
            <GoBackButton />
          </Link>
        }
        centerTitle='룩북 만들기'
        rightSlot={
          <div>
            {state?.outfit && (
              <C.ActionButton
                color='error'
                onClick={handleDeleteButtonClick}
                disabled={isLoading}
              >
                삭제
              </C.ActionButton>
            )}
            <C.ActionButton
              color='inherit'
              onClick={handleSaveButtonClick}
              disabled={isLoading}
            >
              저장
            </C.ActionButton>
          </div>
        }
      />

      <DeleteDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default LookbookCreateHeader;
