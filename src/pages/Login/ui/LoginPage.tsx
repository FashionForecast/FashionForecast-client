import { Footer } from '@/widgets/Footer';

import { SocialProvider } from '@/entities/auth';
import { ClothesIconNames } from '@/entities/clothes';
import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';

import { ENV_SERVER_URL } from '@/shared/consts';
import { HeadHelmet, KakaoIcon, GoogleIcon } from '@/shared/ui';

import LoginHeader from './LoginHeader/LoginHeader';
import { C, S } from './LoginPage.style';

const LOGIN_BUTTONS: Array<{
  provider: SocialProvider;
  text: string;
  icon: React.ReactNode;
}> = [
  { provider: 'kakao', text: '카카오', icon: <KakaoIcon /> },
  { provider: 'google', text: '구글', icon: <GoogleIcon /> },
];

const CLOTHES_ICONS: Array<{ name: ClothesIconNames; color: string }> = [
  { name: '코트', color: '#53616F' },
  { name: '반팔티', color: '#FB9FE1' },
  { name: '면바지', color: '#FFEF9B' },
  { name: '청바지', color: '#2160A9' },
];

export const LoginPage = () => {
  const handleLoginClick = (provider: SocialProvider) => () => {
    window.location.href = `${ENV_SERVER_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <>
      <HeadHelmet
        title='로그인'
        description='나만의 계절별 룩북을 만들어보세요.'
        urlPath='/login'
      />

      <S.LoginPageWrap>
        <LoginHeader />

        <S.Content>
          <S.Article>
            <S.ClothesGroup>
              {CLOTHES_ICONS.map(({ name, color }) => (
                <S.ClothesIconWrap key={name}>
                  <ClothesIcon name={name} color={color} />
                </S.ClothesIconWrap>
              ))}
            </S.ClothesGroup>

            <S.Title>나의 옷장을 날씨에 담아보세요</S.Title>

            <S.Description>
              오늘 날씨를 고민할 필요 없이
              <br />
              1분만에 오늘의 옷차림을 결정하세요
            </S.Description>
          </S.Article>

          <S.SocialButtonGroup>
            {LOGIN_BUTTONS.map(({ provider, text, icon }) => (
              <C.SocialButton
                key={provider}
                size='large'
                startIcon={icon}
                $provider={provider}
                onClick={handleLoginClick(provider)}
              >
                {text} 계정으로 계속하기
              </C.SocialButton>
            ))}
          </S.SocialButtonGroup>
        </S.Content>

        <Footer />
      </S.LoginPageWrap>
    </>
  );
};
