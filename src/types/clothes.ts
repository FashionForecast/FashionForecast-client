export type OutfitType =
  | 'OUTER'
  | 'TOP'
  | 'BOTTOM'
  | 'ETC'
  | 'BASIC_UMBRELLA'
  | 'FOLDING_UMBRELLA'
  | 'LAYERED';

export type ClothesResponse = {
  data: Array<{
    name: 'string';
    outfitType: OutfitType;
  }>;
  message: string;
  status: number;
};
