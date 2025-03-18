import styled from '@emotion/styled';

const SearchPageWrap = styled.div`
  margin-top: 56px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const InputWrap = styled.div`
  padding: 8px 16px;
`;

export const S = {
  SearchPageWrap,
  InputWrap,
};
