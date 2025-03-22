import { LookbookSelect } from '@/pages/UserLookbookCreate/ui/UserLookbookCreatePage';

import { WeatherTypeNumber } from '@/entities/weather';

import { createLookbookItem, updateLookbookItem } from '../api/lookbook';

export async function saveLookbook(
  weatherType: WeatherTypeNumber,
  select: LookbookSelect,
  token: string | null,
  outfitId?: number
) {
  try {
    const { top, bottom } = select;
    const data = {
      topType: top.name,
      topColor: top.color,
      bottomType: bottom.name,
      bottomColor: bottom.color,
      tempStageLevel: Number(weatherType),
    };

    const handler = outfitId ? updateLookbookItem : createLookbookItem;
    await handler(data, token, outfitId);
  } catch (error) {
    throw new Error(error as string);
  }
}
