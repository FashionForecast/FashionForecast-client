import { SelectGender } from '@/features/member';

import { HeadHelmet, Header } from '@/shared/ui';

import { S } from './UserGenderPage.style';

export const UserGenderPage = () => {
  return (
    <>
      <HeadHelmet
        title='성별 설정'
        description='성별을 설정해주세요.'
        urlPath='/user/gender'
      />

      <S.UserGenderPageWrap>
        <Header centerTitle='회원가입' />

        <SelectGender />
      </S.UserGenderPageWrap>
    </>
  );
};
