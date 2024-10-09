import styled from '@emotion/styled';

const TimeSelector = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Hypen = styled.div`
  flex-shrink: 0;
  width: 14px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

export const S = { TimeSelector, Hypen };
