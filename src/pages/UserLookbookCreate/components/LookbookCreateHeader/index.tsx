import GoBackButton from '@/components/GoBackButton';
import Header from '@/components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { C, S } from './style';
import { LookbookSelect } from '../..';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WeatherType } from '@/types/weather';
import { saveLookbook } from '@/service/clothes';
import useAppSelector from '@/hooks/useAppSelector';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import { useState } from 'react';

type LookbookCreateHeaderProps = {
  weatherType: WeatherType;
  select: LookbookSelect;
};

const LookbookCreateHeader = ({
  weatherType,
  select,
}: LookbookCreateHeaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: () => saveLookbook(weatherType, select, accessToken),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['user'] }),
  });

  const handleClick = () => {
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

  return (
    <Header>
      <Link to={'/'}>
        <GoBackButton />
      </Link>

      <S.TitleWrap>
        <h6>룩북 만들기</h6>
      </S.TitleWrap>

      <C.Button color='inherit' onClick={handleClick} disabled={isLoading}>
        저장
      </C.Button>
    </Header>
  );
};

export default LookbookCreateHeader;
