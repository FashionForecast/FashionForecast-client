import styled from '@emotion/styled';

const Title = styled.h3`
  ${({ theme }) => theme.typo['subtitle-1']};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const S = { Title };
