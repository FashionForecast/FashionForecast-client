import { LOGIN } from '@/constants/localStorage/key';
import { authActions } from '@/redux/slice/authSlice';
import { AppDispatch } from '@/redux/store';
import { getAccessToken } from '@/service/auth';
import { NavigateFunction } from 'react-router-dom';

export async function storeAccessToken(
  dispatch: AppDispatch,
  navigate: NavigateFunction
) {
  try {
    const accessToken = await getAccessToken();
    dispatch(authActions.setAccessToken(accessToken));
    localStorage.setItem(LOGIN, JSON.stringify(true));
    navigate('/');
  } catch (error) {
    localStorage.removeItem(LOGIN);
    return;
  }
}
