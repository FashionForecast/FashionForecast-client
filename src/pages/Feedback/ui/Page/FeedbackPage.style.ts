import styled from '@emotion/styled';

const FeedbackPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100dvh;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
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
  FeedbackPageWrap,
  Header,
};
