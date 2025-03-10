import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  CLOCK_INNER_RADIUS,
  CLOCK_RADIUS,
  TIME_COLOR,
} from '@/widgets/time/model/consts';
import {
  DraggingRangeStatus,
  VisibleHoursText,
} from '@/widgets/time/model/types';

import { S } from './SectionText.style';

type SectionTextProps = {
  time: string;
  index: number;
  visibleHoursText: VisibleHoursText;
  draggingStartHour: number | null;
  draggingEndHour: number | null;
  tomorrowIndexes: number[];
  isDragging: boolean;
  isTouchDevice: boolean;
  dragRangeStatus: DraggingRangeStatus;
};

export const SectionText = ({
  time,
  index,
  visibleHoursText,
  draggingStartHour,
  draggingEndHour,
  tomorrowIndexes,
  isDragging,
  isTouchDevice,
  dragRangeStatus,
}: SectionTextProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const HourTextRef = useRef<SVGTextElement>(null);

  const [AMPM, hour] = time.split(' ');
  const angle = -90 + index * 15;
  const x =
    CLOCK_RADIUS + CLOCK_INNER_RADIUS * Math.cos((angle * Math.PI) / 180); // 숫자는 원 바깥쪽에
  const y =
    CLOCK_RADIUS + CLOCK_INNER_RADIUS * Math.sin((angle * Math.PI) / 180);
  const { alwaysShowHours, selectedBothEnds } = visibleHoursText;
  const isVisibleText = alwaysShowHours.includes(index);
  const isBothEnds = selectedBothEnds.includes(index);
  const isTomorrow = isTomorrowText(
    draggingStartHour,
    draggingEndHour,
    index,
    tomorrowIndexes
  );

  useEffect(() => {
    const updatePosition = () => {
      const HourTextEl = HourTextRef.current;
      if (!HourTextEl) return;

      const { top, left } = HourTextEl.getBoundingClientRect();
      setPosition({ top: top - 52, left: left - 13 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

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
          {isTomorrow ? '다음날' : AMPM}
        </tspan>
        <tspan x={x} dy={12}>
          {hour}
        </tspan>
      </S.HourText>

      {isTouchDevice &&
        isDragging &&
        draggingEndHour === index &&
        createPortal(
          <S.Tooltip
            $color={TIME_COLOR[dragRangeStatus]}
            $top={position.top}
            $left={position.left}
          >
            <div>{isTomorrow ? '다음날' : AMPM}</div>
            <div>{hour}</div>
          </S.Tooltip>,
          document.body
        )}
    </>
  );
};

const isTomorrowText = (
  draggingStartHour: number | null,
  draggingEndHour: number | null,
  sectionIndex: number,
  tomorrowIndexes: number[]
) => {
  const isDraggingStatus =
    draggingStartHour !== null &&
    draggingEndHour !== null &&
    draggingStartHour - draggingEndHour > 0 &&
    draggingEndHour >= sectionIndex;

  return isDraggingStatus || tomorrowIndexes.includes(sectionIndex);
};
