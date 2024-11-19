import LoginFooter from './LoginFooter/LoginFooter';
import LoginHeader from './LoginHeader/LoginHeader';
import KaKaoIcon from '@/assets/svg/social/kakao.svg?react';
import GoogleIcon from '@/assets/svg/social/google.svg?react';
import 청바지 from '@/components/clothes/청바지';
import 바지 from '@/components/clothes/바지';
import 반팔티 from '@/components/clothes/반팔티';
import 코트 from '@/components/clothes/코트';
import { C, S } from './LoginPage.style';
import HeadHelmet from '@/components/HeadHelmet';

export type SocialType = {
  provider: 'kakao' | 'google';
  text: string;
  icon: React.ReactNode;
};

const SOCIAL_LOGIN: Array<SocialType> = [
  { provider: 'kakao', text: '카카오', icon: <KaKaoIcon /> },
  { provider: 'google', text: '구글', icon: <GoogleIcon /> },
];

const LoginPage = () => {
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
              <바지 color='#FFEF9B' />
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

        <LoginFooter />
      </S.LoginWrap>
    </>
  );
};

export default LoginPage;
