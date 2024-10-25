import { TempCondition } from '@/pages/Home/components/ClothesSection';

export type User = {
  socialId: string;
  nickname: string;
  region: 'DEFAULT' | string;
  outingStartTime: 'DEFAULT' | string;
  outingEndTime: 'DEFAULT' | string;
  tempCondition: TempCondition;
  gender: 'MALE' | 'FEMALE' | null;
  imageUrl: string | null;
};
