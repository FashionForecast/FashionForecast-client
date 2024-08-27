type Outfit =
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
    outfitType: Outfit;
  }>;
  message: string;
  status: number;
};
