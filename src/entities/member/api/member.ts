import { TimeSetOption } from '@/widgets/member/ui/SettingList/TimeSetMenu/TimeSetMenu';
import { SelectedTime } from '@/widgets/time/ui/DeprecatedTimeSelector/DeprecatedTimeSelector';

import { TemperatureCondition } from '@/entities/weather';

import { fetchAPI } from '@/shared/lib';

import { MemberDto } from '../model/types';

export async function getMember(accessToken: string) {
  return await fetchAPI<MemberDto>('/member', {
    headers: { Authorization: `Bearer ${accessToken}` },
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

export async function setMemberRegion(
  region: MemberDto['region'],
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
  option: TemperatureCondition,
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

export async function withdrawalAccount(accessToken: string | null) {
  if (!accessToken) throw new Error('로그인을 해주세요.');

  await fetchAPI('/login/account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
