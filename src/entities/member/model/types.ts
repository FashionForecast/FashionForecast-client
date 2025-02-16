export type Gender = 'MALE' | 'FEMALE';
export type TempCondition = 'COOL' | 'NORMAL' | 'WARM';

export type MemberDto = {
  socialId: string;
  nickname: string;
  region: 'DEFAULT' | string;
  outingStartTime: 'DEFAULT' | string;
  outingEndTime: 'DEFAULT' | string;
  tempCondition: TempCondition;
  gender: Gender | null;
  imageUrl: string | null;
};
