import { SelectedTime } from '@/pages/Home/ui/Page/HomePage';
import { TimeSetOption } from '@/pages/User/TabSection/SettingList/TimeSetMenu/TimeSetMenu';

import { fetchAPI } from '@/shared/lib';

import { MemberDto, TempCondition } from '../model/types';

export async function getMember(accessToken: string) {
  return await fetchAPI<MemberDto>('/member', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

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

export async function setMemberOutingTime(
  select: SelectedTime,
  option: TimeSetOption,
  accessToken: string | null
) {
  if (!accessToken) throw new Error('로그인을 해주세요.');

  const data = {
    startTime: option === 'DEFAULT' ? option : select.start,
    endTime: option === 'DEFAULT' ? option : select.end,
  };

  await fetchAPI('/member/outingTime', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function setMemberDefaultRegion(
  region: string,
  accessToken: string | null
) {
  if (!accessToken) throw new Error('로그인을 해주세요.');

  await fetchAPI('/member/region', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ region }),
  });
}

export async function setMemberClothesThickness(
  option: TempCondition,
  accessToken: string | null
) {
  if (!accessToken) throw new Error('로그인을 해주세요.');

  await fetchAPI('/member/temp-condition', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tempCondition: option }),
  });
}
