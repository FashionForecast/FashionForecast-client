import styled from '@emotion/styled';

const Clock = styled.div`
  position: relative;

  /* & svg,
  path {
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  } */
`;

const ClockFace = styled.svg`
  user-select: none;
  background-color: aqua;
`;

const HourText = styled.text`
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.46px;
`;

const TimeRange = styled.circle<{ $degree: number; $range: number }>`
  stroke-dasharray: 910;
  stroke-dashoffset: calc(
    910 - (910 * ${({ $range }) => $range}) / 100
  ); /* 약 4단위 */

  transform: rotate(${({ $degree }) => `${$degree}deg`}); /* -90deg 오전00사 */
`;

export const S = { Clock, ClockFace, HourText, TimeRange };
