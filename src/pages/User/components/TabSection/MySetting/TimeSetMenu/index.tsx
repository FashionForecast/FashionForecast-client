import {
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
} from '@mui/material';
import MenuItem from '../MenuItem';
import ClockIcon from '@/assets/svg/clock.svg?react';
import CustomButton from '@/components/CustomMui/CustomButton';
import { useRef, useState } from 'react';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import CustomRadio from '@/components/CustomMui/CustomRadio';
import CustomFormControlLabel from '@/components/CustomMui/CustomFormControlLabel';
import { TIME_LIST } from '@/constants/timeSelector/data';
import { SelectedTime } from '@/pages/Home';
import UserTimeSelector from './UserTimeSelector';
import { C } from './style';
import useAppSelector from '@/hooks/useAppSelector';
import { useMutation } from '@tanstack/react-query';
import { setUserTime } from '@/service/auth';
import { storeUser } from '@/utils/auth';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useSnackbar } from '@/contexts/SnackbarProvider';

const DEFAULT = 'DEFAULT';
const SET_IT = 'setIt';
const resetSelectedTime: SelectedTime = {
  day: '오늘',
  start: TIME_LIST[0],
  end: TIME_LIST[0],
};

export type TimeSetOption = typeof DEFAULT | typeof SET_IT;

const TimeSetMenu = () => {
  const user = useAppSelector((state) => state.user.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [selectedTime, setSelectedTime] =
    useState<SelectedTime>(resetSelectedTime);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<TimeSetOption>(
    !user?.outingStartTime || user?.outingStartTime === DEFAULT
      ? DEFAULT
      : SET_IT
  );
  const prevOption = useRef<TimeSetOption>(option);
  const { openSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => setUserTime(selectedTime, option, accessToken),
  });

  const handleClickOpen = () => {
    setOpen(true);
    prevOption.current = option;
  };

  const handleClose = () => {
    setOpen(false);
    setOption(prevOption.current);
    setSelectedTime(resetSelectedTime);
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
        await storeUser(accessToken, dispatch);
        setSelectedTime(resetSelectedTime);
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

              <UserTimeSelector
                selectedTime={selectedTime}
                updateSelectedTime={updateSelectedTime}
                disabled={option !== SET_IT}
              />
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
