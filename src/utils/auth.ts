import { LOGIN } from '@/constants/localStorage/key';
import { authActions } from '@/redux/slice/authSlice';
import { userActions } from '@/redux/slice/userSlice';
import { AppDispatch } from '@/redux/store';
import { getAccessToken, getUser } from '@/service/auth';
import { User } from '@/types/user';

export async function storeAccessToken(dispatch: AppDispatch) {
  try {
    const accessToken = await getAccessToken();
    dispatch(authActions.setAccessToken(accessToken));
    localStorage.setItem(LOGIN, JSON.stringify(true));

    return accessToken;
  } catch (error) {
    localStorage.removeItem(LOGIN);
  }
}

export async function storeUser(
  accessToken: string,
  dispatch: AppDispatch
): Promise<User | undefined> {
  try {
    const user = await getUser(accessToken);
    dispatch(userActions.setUser(user));

    return user;
  } catch (error) {
    localStorage.removeItem(LOGIN);
  }
}
