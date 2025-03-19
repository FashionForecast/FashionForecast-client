import styled from '@emotion/styled';

import { SocialProvider } from '@/entities/auth';

import { forwardPropOption } from '@/shared/lib';
import { Button } from '@/shared/ui';

const LoginPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ClothesGroup = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 16px;
`;

const ClothesIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']};
`;

const Description = styled.p`
  ${({ theme }) => theme.typo['body-2']}
  text-align: center;
`;

const SocialButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
`;

const SocialButton = styled(Button, forwardPropOption)<{
  $provider: SocialProvider;
}>`
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ $provider }) =>
    $provider === 'kakao' ? '#FEE500' : '#FFF'};

  &:hover {
    background-color: ${({ $provider }) =>
      $provider === 'kakao' ? '#F2D41B' : '#F9FAFB'};
  }
`;

export const S = {
  LoginPageWrap,
  Content,
  Article,
  ClothesGroup,
  ClothesIconWrap,
  Title,
  Description,
  SocialButtonGroup,
};

export const C = {
  SocialButton,
};
