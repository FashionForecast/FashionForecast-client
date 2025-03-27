import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { SetCard, storeMember } from '@/entities/member';
import { TemperatureCondition } from '@/entities/weather';

import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import {
  Button,
  Dialog,
  TopClothesIcon,
  ListItemButton,
  CheckCircleIcon,
} from '@/shared/ui';

import { setMemberClothesThickness } from '../../api/member';

import { S } from './ThicknessSetMenu.style';

const OPTION_LABELS = {
  COOL: '시원하게',
  NORMAL: '적당하게',
  WARM: '따뜻하게',
};

const OPTION_BUTTONS: Array<{
  label: string;
  value: TemperatureCondition;
  description: string;
}> = [
  {
    label: OPTION_LABELS['COOL'],
    value: 'COOL',
    description: '얇거나 짧은 옷차림으로 추천해 드려요',
  },
  {
    label: OPTION_LABELS['NORMAL'],
    value: 'NORMAL',
    description: '기온에 딱 맞는 옷차림이에요',
  },
  {
    label: OPTION_LABELS['WARM'],
    value: 'WARM',
    description: '두껍거나 여러 겹의 옷차림으로 추천해 드려요',
  },
];

export const ThicknessSetMenu = () => {
  const member = useAppSelector((state) => state.member.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  const [option, setOption] = useState<TemperatureCondition>(
    member?.tempCondition ? member.tempCondition : 'NORMAL'
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const snackbar = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => setMemberClothesThickness(option, accessToken),
  });

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // Dialog가 완전히 닫힌 후, 회원 설정값으로 롤백
    setTimeout(() => member && setOption(member.tempCondition), 200);
  };

  const handleOptionChange =
    (temperatureCondition: TemperatureCondition) => () => {
      setOption(temperatureCondition);
    };

  const handleOptionSaveClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: async () => {
        await storeMember(accessToken, dispatch);
        setIsDialogOpen(false);
      },
      onError: () => snackbar.open('옷차림 두께 설정에 실패했어요.'),
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <>
      <div onClick={handleDialogOpen}>
        <SetCard
          icon={<TopClothesIcon />}
          title='기본 옷차림 두께'
          value={OPTION_LABELS[member?.tempCondition || 'NORMAL']}
        />
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        titleSlot={'기본 옷차림 두께'}
        contentSlot={
          <S.DialogContentWrap>
            {OPTION_BUTTONS.map(({ label, value, description }) => (
              <ListItemButton
                key={label}
                label={label}
                description={description}
                color='grey'
                onClick={handleOptionChange(value)}
                selected={option === value}
                iconPosition={{
                  right: option === value && <CheckCircleIcon />,
                }}
              />
            ))}
          </S.DialogContentWrap>
        }
        actionsSlot={
          <>
            <Button variant='outlined' onClick={handleDialogClose}>
              취소
            </Button>
            <Button disabled={isLoading} onClick={handleOptionSaveClick}>
              저장
            </Button>
          </>
        }
      />
    </>
  );
};
