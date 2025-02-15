import { fetchAPI } from '@/shared/lib';
import { AccessToken, Guest } from '../model/types';

export async function getAccessToken() {
  return await fetchAPI<AccessToken>('/login/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
}

export async function guestLogin() {
  return fetchAPI<Guest>('/guest/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid: null }),
  });
}

export async function logout(accessToken: string | null) {
  if (!accessToken) throw new Error('로그인을 해주세요.');

  await fetchAPI('/member/logout', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export async function withdrawlAccount(accessToken: string | null) {
  if (!accessToken) throw new Error('로그인을 해주세요.');

  await fetchAPI('/login/account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
