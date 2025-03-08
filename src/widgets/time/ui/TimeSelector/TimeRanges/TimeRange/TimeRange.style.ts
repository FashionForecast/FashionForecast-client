import styled from '@emotion/styled';

const Range = styled.circle<{ $degree: number }>`
  transform: rotate(${({ $degree }) => $degree + 'deg'});
`;

export const S = { Range };
