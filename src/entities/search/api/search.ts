import { guestLogin } from '@/entities/auth';

import { GUEST_UUID } from '@/shared/consts';
import { fetchAPI } from '@/shared/lib';

import { RecentSearchListDto } from '../model/types';

export async function getRecentSearchList(
  memberId?: string,
  accessToken?: string | null
) {
  try {
    const uuid =
      memberId && accessToken ? memberId : localStorage.getItem(GUEST_UUID);

    return await fetchAPI<RecentSearchListDto>(`/search/${uuid}`);
  } catch (error) {
    // 유효하지 않은 비회원 uuid인 경우, 새로운 uuid 발급
    if (String(error).includes('S002')) {
      const data = await guestLogin();
      if (data.uuid) {
        localStorage.setItem(GUEST_UUID, data.uuid);
        return;
      }
    }
    throw new Error(error as string);
  }
}
