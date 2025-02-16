import styled from '@emotion/styled';

const FeedbackWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
  padding: 0 16px 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 8px 0;

  & h6 {
    ${({ theme }) => theme.typo.h6}
  }
`;

export const S = {
  FeedbackWrap,
  Header,
};
