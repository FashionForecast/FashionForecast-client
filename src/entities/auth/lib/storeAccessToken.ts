import { authActions } from '@/entities/auth/model/slice';
import { getAccessToken } from '../api/auth';
import { LOGIN } from '@/shared/consts';

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
