import styled from '@emotion/styled';

const Section = styled.section`
  ${({ theme }) => theme.typo['body-2']}
  flex-grow: 1;
  padding: 16px 0;

  p {
    margin-bottom: 16px;
  }
`;

export const S = {
  Section,
};
