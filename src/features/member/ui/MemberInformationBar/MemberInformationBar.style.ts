import styled from '@emotion/styled';

const InformationBar = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px 12px;
`;

const Information = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const S = {
  InformationBar,
  Information,
};
