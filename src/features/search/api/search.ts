import { guestLogin } from '@/entities/auth';

import { GUEST_UUID } from '@/shared/consts';
import { fetchAPI } from '@/shared/lib';

import { RecentSearchListDto, RecentSearchRegion } from '../model/types';

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

export async function updateResentSearch(
  region: string,
  memberId?: string,
  accessToken?: string | null
) {
  try {
    const uuid =
      memberId && accessToken ? memberId : localStorage.getItem(GUEST_UUID);
    const [city, district1, district2] = region.split(' ');
    const district = district2 ? `${district1} ${district2}` : district1;

    await fetchAPI(`/search/${uuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, district }),
    });
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

export async function deleteSearchWord(
  region: RecentSearchRegion,
  memberId?: string,
  accessToken?: string | null
) {
  const uuid =
    memberId && accessToken ? memberId : localStorage.getItem(GUEST_UUID);

  await fetchAPI(`/search/${uuid}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(region),
  });
}
