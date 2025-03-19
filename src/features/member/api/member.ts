import { fetchAPI } from '@/shared/lib';

export async function setMemberGender(
  gender: string,
  accessToken: string | null
) {
  if (!accessToken) {
    throw Error('로그인을 해주세요.');
  }

  await fetchAPI('/member/gender', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gender }),
  });
}
