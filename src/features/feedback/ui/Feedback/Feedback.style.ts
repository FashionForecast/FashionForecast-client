import styled from '@emotion/styled';

const FeedbackSection = styled.section`
  ${({ theme }) => theme.typo['body-2']}
  flex-grow: 1;
  padding: 0 16px;
`;

const Description = styled.p`
  padding: 8px 0 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ButtonWrap = styled.div`
  padding: 0 16px;
`;

export const S = {
  FeedbackSection,
  Description,
  ButtonWrap,
};
