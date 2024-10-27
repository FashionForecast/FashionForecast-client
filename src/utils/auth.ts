import { LOGIN } from '@/constants/localStorage/key';
import { authActions } from '@/redux/slice/authSlice';
import { userActions } from '@/redux/slice/userSlice';
import { AppDispatch } from '@/redux/store';
import { getAccessToken, getUser } from '@/service/auth';
import { User } from '@/types/user';

export async function storeAccessToken(dispatch: AppDispatch): Promise<string> {
  try {
    const accessToken = await getAccessToken();
    dispatch(authActions.setAccessToken(accessToken));
    localStorage.setItem(LOGIN, JSON.stringify(true));

    return accessToken;
  } catch (error) {
    localStorage.removeItem(LOGIN);
    throw error;
  }
}

export async function storeUser(
  accessToken: string | null,
  dispatch: AppDispatch
): Promise<User> {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const user = await getUser(accessToken);
    dispatch(userActions.setUser(user));

    return user;
  } catch (error) {
    localStorage.removeItem(LOGIN);
    throw error;
  }
}
