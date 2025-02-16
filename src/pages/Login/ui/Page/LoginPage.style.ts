import styled from '@emotion/styled';

import { forwardPropOption } from '@/shared/lib';
import { CustomButton } from '@/shared/ui';

import { SocialType } from './LoginPage';

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
`;

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  padding: 30px 16px 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};

  & h3 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin: 32px 0 16px;
  }

  & p {
    ${({ theme }) => theme.typo['body-2']}
    margin-bottom: 32px;
    text-align: center;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ImageWrap = styled.div`
  display: flex;

  & svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;

    &:first-of-type {
      margin-right: 32px;
    }
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
  ImageSection,
  ImageWrap,
  ButtonWrap,
};

export const C = {
  SocialButton,
};
