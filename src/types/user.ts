import { TempCondition } from '@/pages/Home/ClothesSection/ClothesSection';

export type Gender = 'MALE' | 'FEMALE';

export type User = {
  socialId: string;
  nickname: string;
  region: 'DEFAULT' | string;
  outingStartTime: 'DEFAULT' | string;
  outingEndTime: 'DEFAULT' | string;
  tempCondition: TempCondition;
  gender: Gender | null;
  imageUrl: string | null;
};
