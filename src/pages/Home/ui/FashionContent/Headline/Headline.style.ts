import styled from '@emotion/styled';

const HeadlineWrap = styled.div<{ $color: string }>`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px;
  margin: 0 8px;
  margin-bottom: 12px;
  background-color: ${({ $color }) => $color};
  border-radius: 16px;

  & h6 {
    color: ${({ theme }) => theme.colors.text.primary};
    ${({ theme }) => theme.typo['body-2']};
  }
`;

export const S = {
  HeadlineWrap,
};
