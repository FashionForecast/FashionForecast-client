import LoginFooter from './components/LoginFooter';
import LoginHeader from './components/LoginHeader';
import KaKaoIcon from '@/assets/svg/social/kakao.svg?react';
import GoogleIcon from '@/assets/svg/social/google.svg?react';
import ClothesImage from '@/assets/svg/loginClothes.svg?react';
import { C, S } from './style';

export type SocialType = {
  provider: 'kakao' | 'google';
  text: string;
  icon: React.ReactNode;
};

const SOCIAL_LOGIN: Array<SocialType> = [
  { provider: 'kakao', text: '카카오', icon: <KaKaoIcon /> },
  { provider: 'google', text: '구글', icon: <GoogleIcon /> },
];

const Login = () => {
  const handleLoginClick = (provider: string) => () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_URL
    }/oauth2/authorization/${provider}`;
  };

  return (
    <S.LoginWrap>
      <LoginHeader />

      <S.MainWrap>
        <ClothesImage />

        <title>나의 옷장을 날씨에 담아보세요</title>

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
  );
};

export default Login;
