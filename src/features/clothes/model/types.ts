import { LookbookCreatePageState } from '@/entities/clothes';

export type PageStateOutfit = Exclude<
  LookbookCreatePageState,
  null
>['clickedOutfit'];

export type NewLookbookItem = {
  topType: string;
  topColor: string;
  bottomType: string;
  bottomColor: string;
  tempStageLevel: number;
};
