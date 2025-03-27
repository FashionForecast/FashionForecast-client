import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { generateTimeRange } from '@/widgets/time/lib/generateTimeRange';
import {
  CLOCK_INNER_RADIUS,
  CLOCK_RADIUS,
  TIME_COLOR,
} from '@/widgets/time/model/consts';
import {
  DraggingRangeStatus,
  VisibleHoursText,
} from '@/widgets/time/model/types';

import { S } from './HourText.style';

type HourTextProps = {
  time: string;
  hourIndex: number;
  visibleHoursText: VisibleHoursText;
  draggingStartHour: number | null;
  draggingEndHour: number | null;
  nextDayTimeRanges: number[];
  isDragging: boolean;
  isTouchDevice: boolean;
  draggingRangeStatus: DraggingRangeStatus;
};

export const HourText = ({
  time,
  hourIndex,
  visibleHoursText,
  draggingStartHour,
  draggingEndHour,
  nextDayTimeRanges,
  isDragging,
  isTouchDevice,
  draggingRangeStatus,
}: HourTextProps) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const HourTextRef = useRef<SVGTextElement>(null);

  const [AMPM, hour] = time.split(' ');
  const { x, y } = polarToCartesian(hourIndex);
  const { alwaysShowHours, selectedBothEnds } = visibleHoursText;
  const isVisibleText = alwaysShowHours.includes(hourIndex);
  const isBothEnds = selectedBothEnds.includes(hourIndex);
  const isNextDayHour = checkNextDayHour();

  function checkNextDayHour() {
    const draggingRanges =
      isDragging && draggingStartHour! > draggingEndHour!
        ? generateTimeRange(0, draggingEndHour!)
        : [];

    return (
      draggingRanges.includes(hourIndex) ||
      nextDayTimeRanges.includes(hourIndex)
    );
  }

  /** touch 기기에서 드래깅 중일 때, 툴팁 위치 업데이트 */
  useLayoutEffect(() => {
    if (!isTouchDevice || !isDragging) return;

    if (draggingEndHour === hourIndex) {
      const HourTextElement = HourTextRef.current;
      if (!HourTextElement) return;

      const { top, left } = HourTextElement.getBoundingClientRect();
      setTooltipPosition({ top: top - 52, left: left - 8 });
    }
  }, [draggingEndHour, hourIndex, isDragging, isTouchDevice]);

  return (
    <>
      <S.HourText
        x={x}
        y={y}
        textAnchor='middle'
        $isVisible={isVisibleText}
        $isHighlight={isBothEnds}
        ref={HourTextRef}
      >
        <tspan x={x} dy={-2}>
          {isNextDayHour ? '다음날' : AMPM}
        </tspan>
        <tspan x={x} dy={12}>
          {hour}
        </tspan>
      </S.HourText>

      {isTouchDevice &&
        createPortal(
          <S.Tooltip
            $color={TIME_COLOR[draggingRangeStatus]}
            $top={tooltipPosition.top}
            $left={tooltipPosition.left}
            $visible={draggingEndHour === hourIndex}
          >
            <div>{isNextDayHour ? '다음날' : AMPM}</div>
            <div>{hour}</div>
          </S.Tooltip>,
          document.getElementById('root')!
        )}
    </>
  );
};

// 극좌표를 직교 좌표로 변환하는 함수
function polarToCartesian(angle: number) {
  const radian = (-90 + angle * 15) * (Math.PI / 180);
  return {
    x: CLOCK_RADIUS + CLOCK_INNER_RADIUS * Math.cos(radian),
    y: CLOCK_RADIUS + CLOCK_INNER_RADIUS * Math.sin(radian),
  };
}
