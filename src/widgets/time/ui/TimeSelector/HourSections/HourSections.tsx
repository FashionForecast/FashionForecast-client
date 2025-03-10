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
  tomorrowTime?: Time;
  draggingStartHour: number | null;
  draggingEndHour: number | null;
  isDragging: boolean;
  dragRangeStatus: DraggingRangeStatus;
  onPointerDown: (index: number) => void;
  onPointerMove: (index: number) => void;
  onDelete: () => void;
};

export const HourSections = ({
  times,
  tomorrowTime,
  draggingStartHour,
  draggingEndHour,
  isDragging,
  dragRangeStatus,
  onPointerDown,
  onPointerMove,
  onDelete,
}: HourSectionsProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const visibleHoursText = getVisibleHoursText({
    times,
    draggingStartHour,
    draggingEndHour,
  });

  const tomorrowIndexes =
    tomorrowTime?.ranges.slice(tomorrowTime.ranges.findIndex((i) => i === 0)) ||
    [];

  const handlePointerMoveEvent = (event: React.PointerEvent) => {
    const { clientX, clientY } = event; // 포인터 위치 가져오기
    const element = document.elementFromPoint(
      clientX,
      clientY
    ) as HTMLElement | null; // 현재 포인터 아래 요소 탐지

    if (element && element.dataset.index) {
      const index = parseInt(element.dataset.index, 10); // `data-index`에서 인덱스 가져오기
      onPointerMove(index); // 외부로 전달
    }
  };

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
      onPointerMove={handlePointerMoveEvent}
    >
      {compactTimeList.map((time, i) => (
        <Fragment key={time}>
          <HourSection
            index={i}
            onPointerDown={onPointerDown}
            onDelete={onDelete}
          />
          <HourText
            time={time}
            index={i}
            visibleHoursText={visibleHoursText}
            draggingStartHour={draggingStartHour}
            draggingEndHour={draggingEndHour}
            tomorrowIndexes={tomorrowIndexes}
            isDragging={isDragging}
            isTouchDevice={isTouchDevice}
            dragRangeStatus={dragRangeStatus}
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
 * 시계에 표시될 시간 텍스트를 찾기 위해
 * 기본적으로 보여질 시간과 선택된 시간 범위의 양끝단 시간을 찾음
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
