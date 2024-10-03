import CustomButton from '@/components/CustomMui/CustomButton';
import forwardPropOption from '@/utils/emotionForwardPropOption';
import styled from '@emotion/styled';
import { SocialType } from '.';

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  padding: 30px 16px 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};

  & title {
    ${({ theme }) => theme.typo['subtitle-1']}
    display: inline-flex;
    margin: 32px 0 16px;
    font-weight: bold;
  }

  & p {
    ${({ theme }) => theme.typo['body-2']}
    margin-bottom: 32px;
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
`;

const SocialButton = styled(CustomButton, forwardPropOption)<{
  $provider: SocialType['provider'];
}>`
  width: 100%;
  max-width: 600px;
  background-color: ${({ $provider }) =>
    $provider === 'kakao' ? '#FEE500' : '#FFF'};

  &:hover {
    background-color: ${({ $provider }) =>
      $provider === 'kakao' ? '#FEE500' : '#FFF'};
  }
`;

export const S = {
  LoginWrap,
  MainWrap,
  ButtonWrap,
};

export const C = {
  SocialButton,
};
