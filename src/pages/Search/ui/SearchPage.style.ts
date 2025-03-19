import styled from '@emotion/styled';

import { TextField } from '@/shared/ui';

const SearchPageWrap = styled.div`
  min-height: 100dvh;
  padding-top: 56px;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const InputWrap = styled.div`
  padding: 8px 16px;
`;

const SearchInput = styled(TextField)`
  & .MuiFilledInput-root {
    min-height: 56px;
  }
`;

export const S = {
  SearchPageWrap,
  InputWrap,
};

export const C = {
  SearchInput,
};
