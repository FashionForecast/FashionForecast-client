import styled from '@emotion/styled';

import { Button } from '@/shared/ui';

const TitleWrap = styled.div`
  width: 100%;

  & h6 {
    ${({ theme }) => theme.typo.h6}
  }
`;

const Button = styled(Button)`
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
