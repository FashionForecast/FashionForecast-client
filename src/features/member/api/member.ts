import { fetchAPI } from '@/shared/lib';

export async function setMemberGender(gender: string, accessToken: string) {
  await fetchAPI('/member/gender', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gender }),
  });
}
