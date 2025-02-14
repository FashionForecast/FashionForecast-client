import { compactTimeList } from '@/shared/consts/timeList';
import { SectionArea } from './SectionArea/SectionArea';
import { SectionText } from './SectionText/SectionText';
import { useEffect, useState } from 'react';
import { DragRangeStatus, Time } from '../../model/types';

type HourSectionsProps = {
  visibleTimeText: [number[], number[]];
  tomorrowTime?: Time;
  startTimeIndex: number;
  focusedTimeIndex: number | null;
  isDragging: boolean;
  dragRangeStatus: DragRangeStatus;
  handlePointerDown: (index: number) => void;
  handlePointerMove: (index: number) => void;
  handleDelete: () => void;
};

export const HourSections = ({
  visibleTimeText,
  tomorrowTime,
  startTimeIndex,
  focusedTimeIndex,
  isDragging,
  dragRangeStatus,
  handlePointerDown,
  handlePointerMove,
  handleDelete,
}: HourSectionsProps) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const center = 170; // SVG 중심 좌표 (x, y)
  const tommrowIndexes =
    tomorrowTime?.indexes.slice(
      tomorrowTime.indexes.findIndex((i) => i === 0)
    ) || [];

  const handlePointerMoveEvent = (event: React.PointerEvent) => {
    const { clientX, clientY } = event; // 포인터 위치 가져오기
    const element = document.elementFromPoint(
      clientX,
      clientY
    ) as HTMLElement | null; // 현재 포인터 아래 요소 탐지

    if (element && element.dataset.index) {
      const index = parseInt(element.dataset.index, 10); // `data-index`에서 인덱스 가져오기
      handlePointerMove(index); // 외부로 전달
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
            handlePointerDown={handlePointerDown}
            handleDelete={handleDelete}
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
          startTimeIndex={startTimeIndex}
          focusedTimeIndex={focusedTimeIndex}
          tommrowIndexes={tommrowIndexes}
          isDragging={isDragging}
          isTouchDevice={isTouchDevice}
          dragRangeStatus={dragRangeStatus}
        />
      ))}
    </svg>
  );
};
