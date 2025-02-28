import styled from '@emotion/styled';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
} from '@mui/material';

type MuiDialogProps = React.ComponentProps<typeof MuiDialog>;

type CustomDialogProps = MuiDialogProps & {
  titleSlot?: React.ReactNode;
  contentSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
};

/**
 * - open - 렌더링 여부
 * - onClose - 닫기 요청 시 실행되는 callback 함수
 * - titleSlot - 상단 타이틀 슬롯
 * - contentSlot - 중앙 콘텐츠 슬롯
 * - actionsSlot - 하단 액션 슬롯
 * - 이외의 props - [MuiDialog](https://mui.com/material-ui/api/dialog/)
 */
export const Dialog = ({
  titleSlot,
  contentSlot,
  actionsSlot,
  ...rest
}: CustomDialogProps) => {
  return (
    <BaseDialog {...rest}>
      {titleSlot && <DialogTitle>{titleSlot}</DialogTitle>}
      {contentSlot && <DialogContent>{contentSlot}</DialogContent>}
      {actionsSlot && <DialogActions>{actionsSlot}</DialogActions>}
    </BaseDialog>
  );
};

const BaseDialog = styled(MuiDialog)`
  & .MuiPaper-root {
    width: 100%;
    margin: 0 16px;
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 16px;
  }

  & .MuiDialogTitle-root {
    ${({ theme }) => theme.typo.h6}
  }

  & .MuiDialogContent-root {
    ${({ theme }) => theme.typo['body-2']}
  }

  & .MuiDialogActions-root {
    padding: 16px;
  }
`;
