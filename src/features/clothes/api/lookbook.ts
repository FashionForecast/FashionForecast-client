import { LookbookItemData } from '@/entities/clothes/model/types';

import { fetchAPI } from '@/shared/lib';

export async function createLookbookItem(
  data: LookbookItemData,
  token: string | null
) {
  await fetchAPI('/member/outfit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function updateLookbookItem(
  data: LookbookItemData,
  token: string | null,
  outfitId?: number
) {
  await fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteLookbookItem(
  outfitId: number | undefined,
  accessToken: string | null
) {
  if (!outfitId) throw new Error(`해당 룩북을 찾을 수 없습니다.`);

  fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
