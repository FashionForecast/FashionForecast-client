import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { LookbookCreatePageState, OutfitSelection } from '@/entities/clothes';
import { WeatherTypeNumber } from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { ArrowIcon, Button, Header, IconButton } from '@/shared/ui';

import { saveLookbook } from '../../lib/saveLookbook';

import { DeleteDialog } from './DeleteDialog/DeleteDialog';
import { C, S } from './LookbookCreateHeader.style';

type LookbookCreateHeaderProps = {
  weatherTypeNumber: WeatherTypeNumber;
  selection: OutfitSelection;
};

export const LookbookCreateHeader = ({
  weatherTypeNumber,
  selection,
}: LookbookCreateHeaderProps) => {
  const member = useAppSelector((state) => state.member.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pageState: LookbookCreatePageState = useLocation().state;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const pageStateOutfit = pageState?.clickedOutfit;
  const pageReferrer = pageState?.referrer;

  const { mutate } = useMutation({
    mutationFn: () =>
      saveLookbook({
        weatherTypeNumber,
        outfitSelection: selection,
        accessToken,
        outfitId: pageStateOutfit?.memberOutfitId,
      }),
  });

  const handleSaveButtonClick = () => {
    if (!member) {
      snackbar.open({
        message: '나만의 룩북은 로그인이 필요해요.',
        action: <Button onClick={() => navigate('/login')}>로그인</Button>,
      });

      return;
    }

    setIsLoading(true);

    mutate(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate(pageReferrer ? pageReferrer : '/user');
      },
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
          <Link to={pageReferrer ? pageReferrer : '/user'}>
            <IconButton size='large'>
              <ArrowIcon />
            </IconButton>
          </Link>
        }
        centerTitle={pageStateOutfit ? '룩북 수정하기' : '룩북 만들기'}
        rightSlot={
          <S.ButtonGroup>
            {pageStateOutfit && (
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
