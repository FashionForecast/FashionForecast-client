import { TemperatureCondition } from '@/entities/weather';

export type Gender = 'MALE' | 'FEMALE';

export type MemberDto = {
  socialId: string;
  nickname: string;
  region: 'DEFAULT' | string;
  outingStartTime: 'DEFAULT' | string;
  outingEndTime: 'DEFAULT' | string;
  tempCondition: TemperatureCondition;
  gender: Gender | null;
  imageUrl: string | null;
};
