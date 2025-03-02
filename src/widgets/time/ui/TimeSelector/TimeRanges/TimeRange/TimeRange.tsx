import { TIME_COLOR } from '@/widgets/time/model/consts';
import { DragRangeStatus } from '@/widgets/time/model/types';

import { theme } from '@/shared/styles';

import { S } from './TimeRange.style';

type TimeRangeProps = {
  startTime: number;
  endTime: number;
  dragRangeStatus?: DragRangeStatus;
  isDefaultTime?: boolean;
};

export const TimeRange = ({
  startTime,
  endTime,
  dragRangeStatus,
  isDefaultTime,
}: TimeRangeProps) => {
  const diff = calcTimeRange(startTime, endTime);
  const degree = -90 + startTime * 15;
  const stroke = getStrockColor(dragRangeStatus, isDefaultTime);

  return (
    <>
      <S.Range
        $degree={degree}
        $range={diff}
        cx={'0'}
        cy={'0'}
        r={'144'}
        fill='transparent'
        stroke={stroke}
        strokeWidth={40}
        strokeLinecap='round'
      />

      {!isDefaultTime && (
        <path
          d={calculatePath(startTime, endTime)}
          fill='none'
          stroke={theme.colors.blueGrey[400]}
          strokeWidth='2'
          strokeDasharray='5 7'
          strokeLinecap='round'
        />
      )}
    </>
  );
};

function calculatePath(startTime: number, end: number) {
  if (startTime === end) return;

  const center = 0;
  const timeDiff = (end - startTime + 24) % 24;
  let radius = 144;

  // -90도: 오전 0시
  const startAngle = -90 + startTime * 15 + 9;
  const endAngle = -90 + end * 15 - 9;

  const startX = center + radius * Math.cos((Math.PI / 180) * startAngle);
  const startY = center + radius * Math.sin((Math.PI / 180) * startAngle);
  const endX = center + radius * Math.cos((Math.PI / 180) * endAngle);
  const endY = center + radius * Math.sin((Math.PI / 180) * endAngle);

  const largeArcFlag = timeDiff > 12 ? 1 : 0;
  radius = timeDiff === 13 ? radius - 10 : radius;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
}

function calcTimeRange(startIndex: number, endTime: number): number {
  const diff = startIndex - endTime;

  // 시작 시간과 종료 시간이 같은 경우
  if (diff === 0) {
    return 0.1;
  }

  const range = Math.abs(diff) * 4.15;

  // 시작 시간이 종료 시간보다 큰 경우
  return diff > 0 ? (24 - diff) * 4.15 : range;
}

function getStrockColor(
  dragRangeStatus: DragRangeStatus | undefined,
  isDefaultTime: boolean | undefined
) {
  if (isDefaultTime) return theme.colors.blueGrey[200];

  return dragRangeStatus
    ? TIME_COLOR[dragRangeStatus]
    : theme.colors.blueGrey[600];
}
