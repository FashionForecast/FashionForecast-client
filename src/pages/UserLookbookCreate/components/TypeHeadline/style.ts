import styled from '@emotion/styled';

const Headline = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  margin: 0 16px 8px;
  background-color: ${({ $color }) => $color};
  border-radius: 12px;

  & h6 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-right: 16px;
  }

  & span {
    ${({ theme }) => theme.typo['body-2']}
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const S = {
  Headline,
};
