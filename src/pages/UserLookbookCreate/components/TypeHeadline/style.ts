import styled from '@emotion/styled';

const Headline = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  margin: 0 16px 8px;
  background-color: ${({ $color }) => $color};
  border-radius: 12px;

  & span {
    ${({ theme }) => theme.typo['body-2']}
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;

  & h6 {
    ${({ theme }) => theme.typo['subtitle-1']}
    margin-right: 10px;
  }
`;

const StandardMark = styled.div`
  ${({ theme }) => theme.typo['body-2']}
  padding: 2px 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 100px;
`;

export const S = {
  Headline,
  TitleWrap,
  StandardMark,
};
