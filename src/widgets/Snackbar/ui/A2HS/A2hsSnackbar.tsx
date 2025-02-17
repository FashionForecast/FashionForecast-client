import useA2HS from '../../model/useA2HS';

import { C } from './A2hsSnackbar.style';

export const A2hsSnackbar = () => {
  const { deferredPrompt, installApp, clearPrompt: hideSnackbar } = useA2HS();

  return (
    deferredPrompt && (
      <C.Snackbar
        open={true}
        message='홈화면에 바로가기를 추가할 수 있어요!'
        handleCloseOnSwipe={hideSnackbar}
        action={
          <C.AddButton size='small' color='inherit' onClick={installApp}>
            추가하기
          </C.AddButton>
        }
      />
    )
  );
};
