import CustomButton from '@/components/CustomMui/CustomButton';
import CustomDialog from '@/components/CustomMui/CustomDialog';
import { DialogActions, DialogContent } from '@mui/material';

type DeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteDialog = ({ isOpen, onClose }: DeleteDialogProps) => {
  return (
    <CustomDialog fullWidth onClose={onClose} open={isOpen}>
      <DialogContent>정말 삭제하시겠습니까?</DialogContent>
      <DialogActions>
        <CustomButton color='inherit' variant='outlined' onClick={onClose}>
          취소
        </CustomButton>
        <CustomButton color='error' variant='contained'>
          삭제
        </CustomButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default DeleteDialog;
