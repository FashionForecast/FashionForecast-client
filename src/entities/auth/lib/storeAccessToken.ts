import { authActions } from '@/entities/auth/model/slice';

import { LOGIN } from '@/shared/consts';

import { getAccessToken } from '../api/auth';

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
