import styled from '@emotion/styled';

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blueGrey.A30};

  &.divider-thick {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const TextWrap = styled.div`
  margin-left: 16px;

  & h6 {
    ${({ theme }) => theme.typo['body-1']}
  }

  & span {
    ${({ theme }) => theme.typo['body-2']}
  }
`;

export const S = { Li, TextWrap };

export const C = {};
