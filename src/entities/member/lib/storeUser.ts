import { userActions } from '@/store/slice/userSlice';
import { getMember } from '../api/member';
import { LOGIN } from '@/shared/consts';

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
