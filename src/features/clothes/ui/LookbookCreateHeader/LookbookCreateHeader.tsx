import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { LookbookCreatePageState } from '@/entities/clothes';
import { WeatherTypeNumber } from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { ArrowIcon, Header, IconButton } from '@/shared/ui';

import { LookbookSelect } from '../../../../pages/UserLookbookCreate/ui/UserLookbookCreatePage';
import { saveLookbook } from '../../lib/saveLookbook';

import DeleteDialog from './DeleteDialog/DeleteDialog';
import { C, S } from './LookbookCreateHeader.style';

type LookbookCreateHeaderProps = {
  weatherTypeNumber: WeatherTypeNumber;
  select: LookbookSelect;
};

export const LookbookCreateHeader = ({
  weatherTypeNumber,
  select,
}: LookbookCreateHeaderProps) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pageState: LookbookCreatePageState = useLocation().state;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () =>
      saveLookbook(
        weatherTypeNumber,
        select,
        accessToken,
        pageState?.clickedOutfit?.memberOutfitId
      ),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const handleSaveButtonClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: () =>
        navigate(pageState?.referrer ? pageState.referrer : '/user'),
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

  const handleDialogToggle = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <>
      <Header
        leftSlot={
          <Link to={pageState?.referrer ? pageState.referrer : '/user'}>
            <IconButton size='large'>
              <ArrowIcon />
            </IconButton>
          </Link>
        }
        centerTitle={pageState?.clickedOutfit ? '룩북 수정하기' : '룩북 만들기'}
        rightSlot={
          <S.ButtonGroup>
            {pageState?.clickedOutfit && (
              <C.ActionButton
                variant='text'
                color='error'
                size='large'
                onClick={handleDialogToggle}
                disabled={isLoading}
              >
                삭제
              </C.ActionButton>
            )}
            <C.ActionButton
              variant='text'
              size='large'
              onClick={handleSaveButtonClick}
              disabled={isLoading}
            >
              저장
            </C.ActionButton>
          </S.ButtonGroup>
        }
      />

      <DeleteDialog isOpen={isDialogOpen} onClose={handleDialogToggle} />
    </>
  );
};
