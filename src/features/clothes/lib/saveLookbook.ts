import { OutfitSelection } from '@/entities/clothes';
import { WeatherTypeNumber } from '@/entities/weather';

import { createLookbookItem, updateLookbookItem } from '../api/lookbook';

export async function saveLookbook(
  weatherType: WeatherTypeNumber,
  select: OutfitSelection,
  token: string | null,
  outfitId?: number
) {
  try {
    const { top, bottom } = select;
    const newLookbook = {
      topType: top.name,
      topColor: top.color,
      bottomType: bottom.name,
      bottomColor: bottom.color,
      tempStageLevel: Number(weatherType),
    };

    const handler = outfitId ? updateLookbookItem : createLookbookItem;
    await handler(newLookbook, token, outfitId);
  } catch (error) {
    throw new Error(error as string);
  }
}
