import styled from '@emotion/styled';

const MatchedRegionItem = styled.li`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  -webkit-tap-highlight-color: transparent;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.action.hover};
  }
`;

const MatchedText = styled.strong`
  color: ${({ theme }) => theme.colors.info.main};
`;

export const S = {
  MatchedRegionItem,
  MatchedText,
};
