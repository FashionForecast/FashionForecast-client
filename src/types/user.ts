import { TempCondition } from '@/pages/Home/components/ClothesSection';

export type User = {
  socialId: string;
  nickname: string;
  region: string;
  outingStartTime: string | null;
  outingEndTime: string | null;
  tempCondition: TempCondition;
  gender: string | null;
  imageUrl: string | null;
};
