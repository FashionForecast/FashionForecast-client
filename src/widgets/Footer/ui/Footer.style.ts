import styled from '@emotion/styled';

import { Button } from '@/shared/ui';

const FooterWrap = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 12px 16px 16px;
`;

const LinkGroup = styled.div`
  display: flex;
  align-items: center;
`;

const SiteButton = styled(Button)`
  @media (max-width: 320px) {
    &.MuiButton-sizeSmall {
      font-size: 11px;
    }
  }
`;

const DivideLine = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 12px;
  background-color: ${({ theme }) => theme.colors.divider};
`;

const Additional = styled.div`
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const InstagramButton = styled(Button)`
  display: flex;
  gap: 4px;

  &.MuiButton-sizeSmall {
    font-size: 11px;
  }

  &.MuiButton-text.MuiButton-colorPrimary {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const S = {
  FooterWrap,
  LinkGroup,
  DivideLine,
  Additional,
};

export const C = {
  SiteButton,
  InstagramButton,
};
