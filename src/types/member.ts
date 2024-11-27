import { TempCondition } from '@/pages/Home/ClothesSection/ClothesSection';

export type Gender = 'MALE' | 'FEMALE';

export type Member = {
  socialId: string;
  nickname: string;
  region: 'DEFAULT' | string;
  outingStartTime: 'DEFAULT' | string;
  outingEndTime: 'DEFAULT' | string;
  tempCondition: TempCondition;
  gender: Gender | null;
  imageUrl: string | null;
};

export type RecentSearchList = Array<{
  city: string;
  district: string;
}>;
