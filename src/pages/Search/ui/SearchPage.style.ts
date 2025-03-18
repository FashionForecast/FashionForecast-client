import styled from '@emotion/styled';

const SearchPageWrap = styled.div`
  min-height: 100dvh;
  padding-top: 56px;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const InputWrap = styled.div`
  padding: 8px 16px;
`;

export const S = {
  SearchPageWrap,
  InputWrap,
};
