import styled from '@emotion/styled';

const Range = styled.circle<{ $degree: number; $range: number }>`
  stroke-dasharray: 910;
  stroke-dashoffset: calc(910 - (910 * ${({ $range }) => $range}) / 100);
  transform: rotate(${({ $degree }) => `${$degree}deg`}); /* -90deg 오전00사 */
`;

export const S = { Range };
