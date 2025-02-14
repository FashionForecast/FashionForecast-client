import { LOGIN } from '@/shared/consts';
import { authActions } from '@/store/slice/authSlice';
import { userActions } from '@/store/slice/userSlice';
import { getAccessToken, getMember } from '@/services/auth';

export async function storeAccessToken(dispatch: AppDispatch) {
  try {
    const { accessToken } = await getAccessToken();
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
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const user = await getMember(accessToken);
    dispatch(userActions.setUser(user));

    return user;
  } catch (error) {
    localStorage.removeItem(LOGIN);
    throw error;
  }
}
