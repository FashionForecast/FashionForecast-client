import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  RadioGroup,
} from '@mui/material';
import MenuItem from '../components/MenuItem/MenuItem';
import { useRef, useState } from 'react';
import CustomButton from '@/components/CustomMui/CustomButton';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import CustomRadio from '@/components/CustomMui/CustomRadio';
import CustomFormControlLabel from '@/components/CustomMui/CustomFormControlLabel';
import TopClothesIcon from '@/components/icon/TopClothesIcon';
import useAppSelector from '@/hooks/useAppSelector';
import { TempCondition } from '@/pages/Home/ClothesSection/ClothesSection';
import { useMutation } from '@tanstack/react-query';
import { setMemberClothesThickness } from '@/services/auth';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import { storeUser } from '@/utils/auth';
import useAppDispatch from '@/hooks/useAppDispatch';

const ThicknessSetMenu = () => {
  const user = useAppSelector((state) => state.user.info);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState<TempCondition>(
    user?.tempCondition ? user.tempCondition : 'NORMAL'
  );
  const prevOption = useRef(option);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { openSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: () => setMemberClothesThickness(option, accessToken),
  });

  const handleClickOpen = () => {
    setOpen(true);
    prevOption.current = option;
  };

  const handleClose = () => {
    setOpen(false);
    setOption(prevOption.current);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as TempCondition);
  };

  const handleSaveButtonClick = () => {
    setIsLoading(true);
    mutate(undefined, {
      onSuccess: async () => {
        const user = await storeUser(accessToken, dispatch);
        setOption(user.tempCondition);
        setOpen(false);
      },
      onError: () => openSnackbar('옷차림 두께 설정에 실패했어요.'),
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <>
      <MenuItem
        title='기본 옷차림 두께'
        value={tempConditionText[user?.tempCondition || 'NORMAL']}
        icon={<TopClothesIcon />}
        handleClick={handleClickOpen}
      />

      <CustomDialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle>기본 옷차림 두께</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={option} onChange={handleOptionChange}>
              <CustomFormControlLabel
                value={'COOL'}
                control={<CustomRadio />}
                label={tempConditionText.COOL}
              />
              <CustomFormControlLabel
                value='NORMAL'
                control={<CustomRadio />}
                label={tempConditionText.NORMAL}
              />
              <CustomFormControlLabel
                value='WARM'
                control={<CustomRadio />}
                label={tempConditionText.WARM}
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
          <CustomButton disabled={isLoading} onClick={handleSaveButtonClick}>
            저장
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default ThicknessSetMenu;

const tempConditionText = {
  COOL: '시원하게',
  NORMAL: '적당하게',
  WARM: '따뜻하게',
};
