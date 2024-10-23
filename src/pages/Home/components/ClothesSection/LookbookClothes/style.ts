import { css } from '@emotion/react';
import styled from '@emotion/styled';

const LookbookList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  height: 100%;
`;

const LookbookCard = styled.li<{ $content?: 'lookbook' | 'add' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(50% - 4px);
  height: calc(50% - 4px);
  padding: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  & svg:first-of-type {
    position: relative;
    top: 2px;
  }

  ${({ $content = 'lookbook', theme }) =>
    $content === 'add' &&
    css`
      justify-content: flex-end;
      padding: 8px 0;
      background-color: transparent;
      border: 1px dashed ${theme.colors.elevation.outlined};
      border-radius: 12px;

      & svg {
        width: 22px;
        height: 22px;
        margin-bottom: 52px;
      }

      & span {
        ${theme.typo['subtitle-1']}
      }
    `}
`;

export const S = { LookbookList, LookbookCard };
