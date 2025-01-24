import styled from '@emotion/styled';

const Clock = styled.div`
  position: relative;
  overscroll-behavior: none;

  & svg,
  path {
    touch-action: none;
    user-select: none;
  }
`;

const ClockFace = styled.svg`
  user-select: none;
  background-color: aqua;
`;

const TimeRange = styled.circle<{ $degree: number; $range: number }>`
  stroke-dasharray: 910;
  stroke-dashoffset: calc(910 - (910 * ${({ $range }) => $range}) / 100);
  transform: rotate(${({ $degree }) => `${$degree}deg`}); /* -90deg 오전00사 */
`;

export const S = { Clock, ClockFace, TimeRange };
