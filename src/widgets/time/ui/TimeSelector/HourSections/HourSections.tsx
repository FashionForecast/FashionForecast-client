import { useEffect, useState } from 'react';

import { compactTimeList } from '@/shared/consts/timeList';

import { DraggingRangeStatus, Time } from '../../../model/types';

import { SectionArea } from './SectionArea/SectionArea';
import { SectionText } from './SectionText/SectionText';

type HourSectionsProps = {
  visibleTimeText: [number[], number[]];
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
  visibleTimeText,
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
  const center = 170; // SVG 중심 좌표 (x, y)
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
      x={-170}
      y={-170}
      width={center * 2}
      height={center * 2}
      viewBox={`0 0 ${center * 2} ${center * 2}`}
      onPointerMove={handlePointerMoveEvent}
    >
      {/* -7도 회전 */}
      <g transform={`rotate(-7, ${center}, ${center})`}>
        {compactTimeList.map((_, i) => (
          <SectionArea
            key={i}
            index={i}
            sections={compactTimeList.length}
            center={center}
            onPointerDown={onPointerDown}
            onDelete={onDelete}
          />
        ))}
      </g>
      {compactTimeList.map((time, i) => (
        <SectionText
          key={time}
          time={time}
          index={i}
          center={center}
          visibleTimeText={visibleTimeText}
          draggingStartHour={draggingStartHour}
          draggingEndHour={draggingEndHour}
          tomorrowIndexes={tomorrowIndexes}
          isDragging={isDragging}
          isTouchDevice={isTouchDevice}
          dragRangeStatus={dragRangeStatus}
        />
      ))}
    </svg>
  );
};
