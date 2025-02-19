import styled from '@emotion/styled';

import { CustomButton } from '@/shared/ui';

const TitleWrap = styled.div`
  width: 100%;

  & h6 {
    ${({ theme }) => theme.typo.h6}
  }
`;

const Button = styled(CustomButton)`
  flex-shrink: 0;
  min-width: 0;
  font-size: 15px;
`;

export const S = {
  TitleWrap,
};

export const C = {
  Button,
};
