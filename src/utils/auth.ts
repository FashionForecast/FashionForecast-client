import { LOGIN } from '@/constants/localStorage/key';
import { authActions } from '@/redux/slice/authSlice';
import { AppDispatch } from '@/redux/store';
import { getAccessToken } from '@/service/auth';

export async function storeAccessToken(dispatch: AppDispatch) {
  try {
    const accessToken = await getAccessToken();
    dispatch(authActions.setAccessToken(accessToken));
    localStorage.setItem(LOGIN, JSON.stringify(true));
  } catch (error) {
    localStorage.removeItem(LOGIN);
    return;
  }
}
