import { Footer } from '@/widgets/Footer';

import 면바지 from '@/entities/clothes/ui/icons/bottom/면바지';
import 청바지 from '@/entities/clothes/ui/icons/bottom/청바지';
import 반팔티 from '@/entities/clothes/ui/icons/top/반팔티';
import 코트 from '@/entities/clothes/ui/icons/top/코트';

import { HeadHelmet, KakaoIcon, GoogleIcon } from '@/shared/ui';

import LoginHeader from './LoginHeader/LoginHeader';
import { C, S } from './LoginPage.style';

export type SocialType = {
  provider: 'kakao' | 'google';
  text: string;
  icon: React.ReactNode;
};

const SOCIAL_LOGIN: Array<SocialType> = [
  { provider: 'kakao', text: '카카오', icon: <KakaoIcon /> },
  { provider: 'google', text: '구글', icon: <GoogleIcon /> },
];

export const LoginPage = () => {
  const handleLoginClick = (provider: string) => () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/oauth2/authorization/${provider}`;
  };

  return (
    <>
      <HeadHelmet
        title='로그인'
        description='나만의 계절별 룩북을 만들어보세요.'
        urlPath='/login'
      />

      <S.LoginWrap>
        <LoginHeader />

        <S.MainWrap>
          <S.ImageSection>
            <S.ImageWrap>
              <코트 color='#53616F' />
              <반팔티 color='#FB9FE1' />
            </S.ImageWrap>
            <S.ImageWrap>
              <면바지 color='#FFEF9B' />
              <청바지 color='#2160A9' />
            </S.ImageWrap>
          </S.ImageSection>

          <h3>나의 옷장을 날씨에 담아보세요</h3>

          <p>
            오늘 날씨를 고민할 필요 없이
            <br />
            1분만에 오늘의 옷차림을 결정하세요
          </p>

          <S.ButtonWrap>
            {SOCIAL_LOGIN.map(({ provider, text, icon }) => (
              <C.SocialButton
                key={provider}
                $provider={provider}
                variant='contained'
                color='inherit'
                size='large'
                startIcon={icon}
                onClick={handleLoginClick(provider)}
              >
                {text} 계정으로 계속하기
              </C.SocialButton>
            ))}
          </S.ButtonWrap>
        </S.MainWrap>

        <Footer />
      </S.LoginWrap>
    </>
  );
};
