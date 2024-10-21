import GoBackButton from '@/components/GoBackButton';
import Header from '@/components/Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { C, S } from './style';
import { LocationState, LookbookSelect } from '../..';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WeatherType } from '@/types/weather';
import { saveLookbook } from '@/service/clothes';
import useAppSelector from '@/hooks/useAppSelector';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import { useState } from 'react';
import DeleteDialog from './DeleteDialog';

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
    mutationFn: () => saveLookbook(weatherType, select, accessToken),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const handleSaveButtonClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: () => navigate('/user'),
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
        <Link to={'/'}>
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
