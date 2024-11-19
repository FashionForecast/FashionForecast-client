import { C } from './A2hsSnackbar.style';
import useA2HS from './hooks/useA2HS';

const A2hsSnackbar = () => {
  const { deferredPrompt, installApp, clearPrompt: hideSnackbar } = useA2HS();

  return (
    deferredPrompt && (
      <C.Snackbar
        open={true}
        message='홈화면에 바로가기를 추가할 수 있어요!'
        handleCloseOnSwipe={hideSnackbar}
        action={
          <C.Button size='small' color='inherit' onClick={installApp}>
            추가하기
          </C.Button>
        }
      />
    )
  );
};

export default A2hsSnackbar;
