import { OutfitSelection } from '@/entities/clothes';
import { WeatherTypeNumber } from '@/entities/weather';

import { createLookbookItem, updateLookbookItem } from '../api/lookbook';

export async function saveLookbook({
  weatherTypeNumber,
  outfitSelection,
  accessToken,
  outfitId,
}: {
  weatherTypeNumber: WeatherTypeNumber;
  outfitSelection: OutfitSelection;
  accessToken: string | null;
  outfitId?: number;
}) {
  try {
    const { top, bottom } = outfitSelection;
    const newLookbook = {
      topType: top.name,
      topColor: top.color,
      bottomType: bottom.name,
      bottomColor: bottom.color,
      tempStageLevel: Number(weatherTypeNumber),
    };

    if (outfitId) {
      await updateLookbookItem({
        lookbookItem: newLookbook,
        accessToken,
        outfitId,
      });
    } else {
      await createLookbookItem(newLookbook, accessToken);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
