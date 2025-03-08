import { CLOCK_INNER_RADIUS, TIME_COLOR } from '@/widgets/time/model/consts';
import { DraggingRangeStatus } from '@/widgets/time/model/types';

import { theme } from '@/shared/styles';

import { S } from './TimeRange.style';

type TimeRangeProps = {
  startHour: number;
  endHour: number;
  dragRangeStatus?: DraggingRangeStatus;
  isDefaultTime?: boolean;
};

const TOTAL_LENGTH = 904;

export const TimeRange = ({
  startHour,
  endHour,
  dragRangeStatus,
  isDefaultTime,
}: TimeRangeProps) => {
  const range = calculateRange(startHour, endHour);
  const degree = -90 + startHour * 15;

  return (
    <>
      <S.Range
        $degree={degree}
        cx={'0'}
        cy={'0'}
        r={CLOCK_INNER_RADIUS}
        fill='transparent'
        stroke={getStrokeColor(dragRangeStatus, isDefaultTime)}
        strokeWidth={40}
        strokeLinecap='round'
        strokeDasharray={TOTAL_LENGTH}
        strokeDashoffset={TOTAL_LENGTH - (TOTAL_LENGTH * range) / 24}
      />

      {!isDefaultTime && (
        <path
          d={calculatePath(startHour, endHour)}
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

  const timeDiff = (end - startTime + 24) % 24;
  let radius = CLOCK_INNER_RADIUS;

  const startAngle = -90 + startTime * 15 + 9;
  const endAngle = -90 + end * 15 - 9;

  const startX = radius * Math.cos((Math.PI / 180) * startAngle);
  const startY = radius * Math.sin((Math.PI / 180) * startAngle);
  const endX = radius * Math.cos((Math.PI / 180) * endAngle);
  const endY = radius * Math.sin((Math.PI / 180) * endAngle);

  const largeArcFlag = timeDiff > 12 ? 1 : 0;
  radius = timeDiff === 13 ? radius - 10 : radius;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
}

function calculateRange(startHour: number, endHour: number): number {
  if (startHour === endHour) {
    return 0.01;
  }

  const hourDifference = startHour - endHour;
  const isNextDay = startHour > endHour;

  return isNextDay ? 24 - hourDifference : Math.abs(hourDifference);
}

function getStrokeColor(
  dragRangeStatus: DraggingRangeStatus | undefined,
  isDefaultTime: boolean | undefined
) {
  if (isDefaultTime) return theme.colors.blueGrey[200];

  return dragRangeStatus
    ? TIME_COLOR[dragRangeStatus]
    : theme.colors.blueGrey[600];
}
