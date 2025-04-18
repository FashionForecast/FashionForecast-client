import { GUEST_UUID } from '@/shared/consts';
import { fetchAPI } from '@/shared/lib';

import { NewLookbookItem } from '../model/types';

export async function createMemberLookbookItem(
  newLookbookItem: NewLookbookItem,
  token: string | null
) {
  await fetchAPI('/member/outfit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLookbookItem),
  });
}

export async function updateMemberLookbookItem({
  newLookbookItem,
  accessToken,
  outfitId,
}: {
  newLookbookItem: NewLookbookItem;
  accessToken: string | null;
  outfitId: number;
}) {
  await fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLookbookItem),
  });
}

export async function deleteMemberLookbookItem(
  outfitId: number | undefined,
  accessToken: string | null
) {
  await fetchAPI(`/member/outfits/${outfitId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function createGuestLookbookItem(lookbookItem: NewLookbookItem) {
  const guestUUID = localStorage.getItem(GUEST_UUID);

  await fetchAPI('/guest/outfit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid: guestUUID, ...lookbookItem }),
  });
}

export async function updateGuestLookbookItem(lookbookItem: NewLookbookItem) {
  const guestUUID = localStorage.getItem(GUEST_UUID);

  await fetchAPI(`/guest/outfit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid: guestUUID, ...lookbookItem }),
  });
}

export async function deleteGuestLookbookItem(tempStageLevel?: number) {
  const guestUUID = localStorage.getItem(GUEST_UUID);

  await fetchAPI(`/guest/outfit`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid: guestUUID, tempStageLevel }),
  });
}
