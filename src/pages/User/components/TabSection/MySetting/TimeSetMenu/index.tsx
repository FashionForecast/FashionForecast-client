import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  RadioGroup,
} from '@mui/material';
import MenuItem from '../MenuItem';
import ClockIcon from '@/assets/svg/clock.svg?react';
import CustomButton from '@/components/CustomMui/CustomButton';
import { useState } from 'react';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import CustomRadio from '@/components/CustomMui/CustomRadio';
import CustomFormControlLabel from '@/components/CustomMui/CustomFormControlLabel';
import { TIME_LIST } from '@/constants/timeSelector/data';
import { SelectedTime } from '@/pages/Home';
import UserTimeSelector from './UserTimeSelector';

const TimeSetMenu = () => {
  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    day: '오늘',
    start: TIME_LIST[0],
    end: TIME_LIST[0],
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateSelectedTime = (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => {
    setSelectedTime((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <MenuItem
        title='기본 외출시간'
        value='오늘 오전 08시 - 오후 07시'
        icon={<ClockIcon />}
        handleClick={handleClickOpen}
      />

      <CustomDialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>기본 외출시간</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              aria-labelledby='외출시간 라디오 그룹'
              defaultValue='default value'
            >
              <CustomFormControlLabel
                value='현재 시간으로부터 8시간 동안'
                control={<CustomRadio />}
                label='현재 시간으로부터 8시간 동안'
              />
              <CustomFormControlLabel
                value='직접 설정'
                control={<CustomRadio />}
                label='직접 설정'
              />

              <UserTimeSelector
                selectedTime={selectedTime}
                updateSelectedTime={updateSelectedTime}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <CustomButton
            color='inherit'
            variant='outlined'
            onClick={handleClose}
          >
            취소
          </CustomButton>
          <CustomButton>저장</CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default TimeSetMenu;
