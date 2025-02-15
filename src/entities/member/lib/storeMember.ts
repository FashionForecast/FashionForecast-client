import { memberActions } from '@/entities/member/model/slice';
import { getMember } from '../api/member';
import { LOGIN } from '@/shared/consts';

export async function storeMember(
  accessToken: string | null,
  dispatch: AppDispatch
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const member = await getMember(accessToken);
    dispatch(memberActions.setMember(member));

    return member;
  } catch (error) {
    localStorage.removeItem(LOGIN);
    throw error;
  }
}
