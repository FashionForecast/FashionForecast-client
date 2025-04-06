import { throttle } from 'lodash';
import { Fragment, useEffect, useState } from 'react';

import { generateTimeRange } from '@/widgets/time/lib/generateTimeRange';
import { CLOCK_RADIUS } from '@/widgets/time/model/consts';

import { compactTimeList } from '@/shared/consts/timeList';

import {
  DraggingRangeStatus,
  Time,
  VisibleHoursText,
} from '../../../model/types';

import { HourSection } from './HourSection/HourSection';
import { HourText } from './HourText/HourText';

type HourSectionsProps = {
  times: Time[];
  draggingStartHour: number | null;
  draggingEndHour: number | null;
  isDragging: boolean;
  draggingRangeStatus: DraggingRangeStatus;
  onPointerDown: (index: number) => void;
  onPointerMove: (index: number) => void;
  onDeleteRange: () => void;
};

export const HourSections = ({
  times,
  draggingStartHour,
  draggingEndHour,
  isDragging,
  draggingRangeStatus,
  onPointerDown,
  onPointerMove,
  onDeleteRange,
}: HourSectionsProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const visibleHoursText = getVisibleHoursText({
    times,
    draggingStartHour,
    draggingEndHour,
  });

  const nextDayTimeRanges =
    times
      .find((v) => v.isNextDay)
      ?.ranges.filter((hour, _, ranges) => ranges[0] > hour) ?? [];

  const detectHourOnPointerMove = throttle((event: React.PointerEvent) => {
    if (!isDragging) return;

    const { clientX, clientY } = event;
    const element = document.elementFromPoint(
      clientX,
      clientY
    ) as HTMLElement | null;

    if (element && element.dataset.hour) {
      const hour = parseInt(element.dataset.hour, 10);
      onPointerMove(hour);
    }
  }, 50);

  useEffect(() => {
    const hasTouchSupport =
      'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouchSupport);
  }, []);

  return (
    <svg
      x={-CLOCK_RADIUS}
      y={-CLOCK_RADIUS}
      width={CLOCK_RADIUS * 2}
      height={CLOCK_RADIUS * 2}
      viewBox={`0 0 ${CLOCK_RADIUS * 2} ${CLOCK_RADIUS * 2}`}
      onPointerMove={detectHourOnPointerMove}
    >
      {compactTimeList.map((time, index) => (
        <Fragment key={time}>
          <HourSection
            hourIndex={index}
            onPointerDown={onPointerDown}
            onDeleteRange={onDeleteRange}
          />
          <HourText
            time={time}
            hourIndex={index}
            isDragging={isDragging}
            draggingStartHour={draggingStartHour}
            draggingEndHour={draggingEndHour}
            draggingRangeStatus={draggingRangeStatus}
            visibleHoursText={visibleHoursText}
            nextDayTimeRanges={nextDayTimeRanges}
            isTouchDevice={isTouchDevice}
          />
        </Fragment>
      ))}
    </svg>
  );
};

type getVisibleHoursTextParams = {
  times: Time[];
  draggingStartHour: number | null;
  draggingEndHour: number | null;
};

/**
 * - 시계에 표시될 시간 텍스트를 표시
 * - 기본적으로 보여질 시간과 선택된 시간 범위의 양끝단 시간을 찾음
 */
function getVisibleHoursText({
  times,
  draggingStartHour,
  draggingEndHour,
}: getVisibleHoursTextParams): VisibleHoursText {
  const isDefaultTime = times[0].isDefault;
  const defaultShowHours = new Set([0, 3, 6, 9, 12, 15, 18, 21]);
  const selectedBothEnds: number[] = [];

  if (isDefaultTime) {
    return {
      alwaysShowHours: Array.from(defaultShowHours),
      selectedBothEnds,
    };
  }

  if (draggingStartHour !== null && draggingEndHour !== null) {
    const draggingRange = generateTimeRange(draggingStartHour, draggingEndHour);
    draggingRange.forEach((hour, index) => {
      if (index === 0 || index === draggingRange.length - 1) {
        selectedBothEnds.push(hour);
      }
      defaultShowHours.delete(hour);
    });
  }

  times.forEach((time) => {
    time.ranges.forEach((hour, index) => {
      if (index === 0 || index === time.ranges.length - 1) {
        selectedBothEnds.push(hour);
      }
      defaultShowHours.delete(hour);
    });
  });

  return {
    alwaysShowHours: Array.from(defaultShowHours),
    selectedBothEnds,
  };
}
