import styled from '@emotion/styled';

const marginTop = '56px';

const SearchPageWrap = styled.div`
  min-height: calc(100dvh - ${marginTop});
  margin-top: ${marginTop};
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const InputWrap = styled.div`
  padding: 8px 16px;
`;

export const S = {
  SearchPageWrap,
  InputWrap,
};
