import { fetchAPI } from '@/shared/lib';

import { MemberDto } from '../model/types';

export async function getMember(accessToken: string) {
  return await fetchAPI<MemberDto>('/member', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
