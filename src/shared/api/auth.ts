import { AccessToken } from '@/types/auth';
import { Member } from '@/types/member';
import { fetchAPI } from '../lib';

export async function getAccessToken() {
  return await fetchAPI<AccessToken>('/login/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
}

export async function getMember(accessToken: string) {
  return await fetchAPI<Member>('/member', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
