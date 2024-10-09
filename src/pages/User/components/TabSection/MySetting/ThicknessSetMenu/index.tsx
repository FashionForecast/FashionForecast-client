import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  RadioGroup,
} from '@mui/material';
import MenuItem from '../MenuItem';
import TshirtIcon from '@/assets/svg/tshirt.svg?react';
import { useState } from 'react';
import CustomButton from '@/components/CustomMui/CustomButton';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import CustomRadio from '@/components/CustomMui/CustomRadio';
import CustomFormControlLabel from '@/components/CustomMui/CustomFormControlLabel';

const ThicknessSetMenu = () => {
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
        title='기본 옷차림 두께'
        value='적당하게'
        icon={<TshirtIcon />}
        handleClick={handleClickOpen}
      />

      <CustomDialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>기본 옷차림 두께</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              aria-labelledby='옷차림 두께 라디오 그룹'
              defaultValue='default value'
            >
              <CustomFormControlLabel
                value='시원하게'
                control={<CustomRadio />}
                label='시원하게'
              />
              <CustomFormControlLabel
                value='적당하게'
                control={<CustomRadio />}
                label='적당하게'
              />
              <CustomFormControlLabel
                value='따뜻하게'
                control={<CustomRadio />}
                label='따뜻하게'
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

export default ThicknessSetMenu;
