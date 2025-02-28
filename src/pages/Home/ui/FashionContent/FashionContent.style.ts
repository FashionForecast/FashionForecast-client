import styled from '@emotion/styled';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px 0 98px;
  background-color: ${({ theme }) => theme.colors.blueGrey[100]};
`;

const ButtonWrap = styled.div`
  padding: 0 16px;
`;

export const S = {
  Section,
  ButtonWrap,
};
