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

const TimeSetMenu = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='radio-buttons-group'
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
