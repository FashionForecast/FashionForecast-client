import { OutfitSelection } from '@/entities/clothes';
import { WeatherTypeNumber } from '@/entities/weather';

import {
  createGuestLookbookItem,
  createMemberLookbookItem,
  updateGuestLookbookItem,
  updateMemberLookbookItem,
} from '../api/lookbook';
import { NewLookbookItem, PageStateOutfit } from '../model/types';

export async function saveLookbook({
  weatherTypeNumber,
  outfitSelection,
  accessToken,
  pageStateOutfit,
}: {
  weatherTypeNumber: WeatherTypeNumber;
  outfitSelection: OutfitSelection;
  accessToken: string | null;
  pageStateOutfit?: PageStateOutfit;
}) {
  try {
    const { top, bottom } = outfitSelection;
    const newLookbookItem: NewLookbookItem = {
      topType: top.name,
      topColor: top.color,
      bottomType: bottom.name,
      bottomColor: bottom.color,
      tempStageLevel: Number(weatherTypeNumber),
    };

    if (accessToken) {
      const outfitId = pageStateOutfit?.memberOutfitId;

      await createOrUpdateMemberLookbook({
        newLookbookItem,
        accessToken,
        outfitId,
      });

      return;
    }

    await createOrUpdateGuestLookbook(newLookbookItem, pageStateOutfit);
  } catch (error) {
    throw new Error(error as string);
  }
}

async function createOrUpdateMemberLookbook({
  newLookbookItem,
  accessToken,
  outfitId,
}: {
  newLookbookItem: NewLookbookItem;
  accessToken: string | null;
  outfitId?: number;
}) {
  if (outfitId) {
    await updateMemberLookbookItem({
      newLookbookItem,
      accessToken,
      outfitId,
    });
    return;
  }

  await createMemberLookbookItem(newLookbookItem, accessToken);
}

async function createOrUpdateGuestLookbook(
  newLookbookItem: NewLookbookItem,
  pageStateOutfit: PageStateOutfit
) {
  if (pageStateOutfit) {
    await updateGuestLookbookItem(newLookbookItem);
    return;
  }

  await createGuestLookbookItem(newLookbookItem);
}
