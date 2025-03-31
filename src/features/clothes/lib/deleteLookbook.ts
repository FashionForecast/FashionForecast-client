import {
  deleteGuestLookbookItem,
  deleteMemberLookbookItem,
} from '../api/lookbook';
import { PageStateOutfit } from '../model/types';

export async function deleteLookbook(
  pageStateOutfit: PageStateOutfit,
  accessToken: string | null
) {
  const outfitId = pageStateOutfit?.memberOutfitId;
  const tempStageLevel = pageStateOutfit?.tempStageLevel;

  if (accessToken) {
    await deleteMemberLookbookItem(outfitId, accessToken);
    return;
  }

  await deleteGuestLookbookItem(tempStageLevel);
}
