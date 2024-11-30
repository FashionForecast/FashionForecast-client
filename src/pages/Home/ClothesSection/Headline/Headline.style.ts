import styled from '@emotion/styled';

const HeadlineWrap = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;

  & h6 {
    ${({ theme }) => theme.typo['subtitle-1']}
  }

  & span {
    ${({ theme }) => theme.typo['body-2']}
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const S = {
  HeadlineWrap,
};
