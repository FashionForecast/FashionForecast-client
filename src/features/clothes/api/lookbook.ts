import { fetchAPI } from '@/shared/lib';

import { NewLookbookItem } from '../model/types';

export async function createLookbookItem(
  lookbookItem: NewLookbookItem,
  token: string | null
) {
  await fetchAPI('/member/outfit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lookbookItem),
  });
}

export async function updateLookbookItem({
  lookbookItem,
  accessToken,
  outfitId,
}: {
  lookbookItem: NewLookbookItem;
  accessToken: string | null;
  outfitId: number;
}) {
  await fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lookbookItem),
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
