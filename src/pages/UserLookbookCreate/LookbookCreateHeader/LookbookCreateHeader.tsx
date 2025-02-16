import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSnackbar } from '@/app/providers/SnackbarProvider';

import { saveLookbook } from '@/entities/clothes';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { WeatherType } from '@/shared/types';
import { GoBackButton, Header } from '@/shared/ui';

import {
  LocationState,
  LookbookSelect,
} from '../ui/Page/UserLookbookCreatePage';

import DeleteDialog from './DeleteDialog/DeleteDialog';
import { C, S } from './LookbookCreateHeader.style';

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
  const { openSnackbar } = useSnackbar();

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
          openSnackbar('5개 이상 저장할 수 없습니다.');
          return;
        }

        openSnackbar('저장에 실패했습니다.');
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
      <Header>
        <Link to={state?.referrer ? state.referrer : '/user'}>
          <GoBackButton />
        </Link>

        <S.TitleWrap>
          <h6>룩북 만들기</h6>
        </S.TitleWrap>

        {state?.outfit && (
          <C.Button
            color='error'
            onClick={handleDeleteButtonClick}
            disabled={isLoading}
          >
            삭제
          </C.Button>
        )}
        <C.Button
          color='inherit'
          onClick={handleSaveButtonClick}
          disabled={isLoading}
        >
          저장
        </C.Button>
      </Header>

      <DeleteDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default LookbookCreateHeader;
