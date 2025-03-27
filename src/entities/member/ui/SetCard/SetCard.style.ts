import styled from '@emotion/styled';

const Card = styled.li<{ $disabled?: boolean; $bottomBorder?: boolean }>`
  display: flex;
  gap: 8px;
  padding: 16px;
  cursor: ${({ $disabled }) => ($disabled ? 'auto' : 'pointer')};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ $bottomBorder, theme }) =>
    $bottomBorder ? `1px solid ${theme.colors.divider}` : 'none'};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.strong`
  ${({ theme }) => theme.typo['subtitle-1']}
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Data = styled.span`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.colors.primary.main};
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const S = { Card, Content, Title, Data, IconWrap };
