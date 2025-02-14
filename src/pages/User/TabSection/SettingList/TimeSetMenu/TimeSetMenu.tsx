import {
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
} from '@mui/material';
import MenuItem from '../components/MenuItem/MenuItem';
import { CustomButton } from '@/shared/ui';
import { useRef, useState } from 'react';
import { CustomDialog } from '@/shared/ui';
import { CustomRadio } from '@/shared/ui';
import { CustomFormControlLabel } from '@/shared/ui';
import { paddedTimeList } from '@/shared/consts/timeList';
import { SelectedTime } from '@/pages/Home/ui/Page/HomePage';
import UserTimeSelector from './UserTimeSelector/UserTimeSelector';
import { C } from './TimeSetMenu.style';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setMemberOutingTime } from '@/services/auth';
import { storeUser } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useSnackbar } from '@/app/providers/SnackbarProvider';
import { Member } from '@/types/member';
import { ClockIcon } from '@/shared/ui';

const DEFAULT = 'DEFAULT';
const SET_IT = 'setIt';

export type TimeSetOption = typeof DEFAULT | typeof SET_IT;

const TimeSetMenu = () => {
  const user = useAppSelector((state) => state.user.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [selectedTime, setSelectedTime] = useState<SelectedTime>(() =>
    getSelectedTime(user)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<TimeSetOption>(
    !user?.outingStartTime || user?.outingStartTime === DEFAULT
      ? DEFAULT
      : SET_IT
  );
  const prevOption = useRef<TimeSetOption>(option);
  const { openSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => setMemberOutingTime(selectedTime, option, accessToken),
  });

  const handleClickOpen = () => {
    setOpen(true);
    prevOption.current = option;
  };

  const handleClose = () => {
    setOpen(false);
    setOption(prevOption.current);
    setSelectedTime(getSelectedTime(user));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as TimeSetOption);
  };

  const updateSelectedTime = (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => {
    setSelectedTime((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveButtonClick = () => {
    setIsLoading(true);

    mutate(undefined, {
      onSuccess: async () => {
        const user = await storeUser(accessToken, dispatch);
        queryClient.invalidateQueries({ queryKey: ['weather'] });
        setSelectedTime(getSelectedTime(user));
        setOpen(false);
      },
      onError: () => openSnackbar('외출시간 설정 오류가 발생했어요.'),
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const settingValue =
    user?.outingStartTime !== 'DEFAULT'
      ? `오늘 ${user?.outingStartTime} - ${user?.outingEndTime}`
      : '현재 시간으로부터 8시간 동안';

  return (
    <>
      <MenuItem
        title='기본 외출시간'
        value={settingValue}
        icon={<ClockIcon />}
        handleClick={handleClickOpen}
      />

      <CustomDialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>기본 외출시간</DialogTitle>
        <DialogContent>
          <C.FormControl>
            <RadioGroup value={option} onChange={handleOptionChange}>
              <CustomFormControlLabel
                value={DEFAULT}
                label='현재 시간으로부터 8시간 동안'
                control={<CustomRadio />}
              />
              <CustomFormControlLabel
                value={SET_IT}
                label='직접 설정'
                control={<CustomRadio />}
              />

              {open && (
                <UserTimeSelector
                  selectedTime={selectedTime}
                  updateSelectedTime={updateSelectedTime}
                  disabled={option !== SET_IT}
                />
              )}
            </RadioGroup>
          </C.FormControl>
        </DialogContent>
        <DialogActions>
          <CustomButton
            color='inherit'
            variant='outlined'
            onClick={handleClose}
          >
            취소
          </CustomButton>
          <CustomButton onClick={handleSaveButtonClick} disabled={isLoading}>
            저장
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default TimeSetMenu;

const defaultSelectedTime: SelectedTime = {
  day: '오늘',
  start: paddedTimeList[8],
  end: paddedTimeList[19],
};

function getSelectedTime(user: Member | null): SelectedTime {
  if (!user || user.outingStartTime === 'DEFAULT') return defaultSelectedTime;

  return { day: '오늘', start: user.outingStartTime, end: user.outingEndTime };
}
