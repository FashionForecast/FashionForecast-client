import { createPortal } from 'react-dom';
import { DragRangeStatus, TIME_COLOR } from '../../TimeSelector';
import { S } from './SectionText.style';
import { useEffect, useRef, useState } from 'react';

type SectionTextProps = {
  time: string;
  index: number;
  center: number;
  visibleTimeText: [number[], number[]];
  startTimeIndex: number;
  focusedTimeIndex: number | null;
  tommrowIndexes: number[];
  isDragging: boolean;
  isTouchDevice: boolean;
  dragRangeStatus: DragRangeStatus;
};

const SectionText = ({
  time,
  index,
  center,
  visibleTimeText,
  startTimeIndex,
  focusedTimeIndex,
  tommrowIndexes,
  isDragging,
  isTouchDevice,
  dragRangeStatus,
}: SectionTextProps) => {
  const [AMPM, hour] = time.split(' ');
  const radius = 144;
  const angle = -90 + index * 15; // 각도 계산
  const x = center + radius * Math.cos((angle * Math.PI) / 180); // 숫자는 원 바깥쪽에
  const y = center + radius * Math.sin((angle * Math.PI) / 180);
  const [always, bothEnds] = visibleTimeText;
  const isHighlight = bothEnds.includes(index) || focusedTimeIndex === index;
  const isVisibleText = isHighlight || always.includes(index);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const HourTextRef = useRef<SVGTextElement>(null);
  const isTommrow = isTommorrowText(
    startTimeIndex,
    focusedTimeIndex,
    index,
    tommrowIndexes
  );

  useEffect(() => {
    const HourTextEl = HourTextRef.current;
    if (!HourTextEl) return;

    const { top, left } = HourTextEl.getBoundingClientRect();
    setPosition({ top: top - 50, left: left - 12 });
  }, []);

  return (
    <>
      <S.HourText
        x={x}
        y={y}
        textAnchor='middle'
        $isVisible={isVisibleText}
        $isHighlight={isHighlight}
        ref={HourTextRef}
      >
        <tspan x={x} dy={-2}>
          {isTommrow ? '내일' : AMPM}
        </tspan>
        <tspan x={x} dy={12}>
          {hour}
        </tspan>
      </S.HourText>

      {isTouchDevice &&
        isDragging &&
        focusedTimeIndex === index &&
        createPortal(
          <S.Tooltip
            $color={TIME_COLOR[dragRangeStatus]}
            $top={position.top}
            $left={position.left}
          >
            <div>{isTommrow ? '내일' : AMPM}</div>
            <div>{hour}</div>
          </S.Tooltip>,
          document.body
        )}
    </>
  );
};

export default SectionText;

const isTommorrowText = (
  startIndex: number,
  focuseIndex: number | null,
  sectionIndex: number,
  tommorrowIndexes: number[]
) => {
  const isDraggingStatus =
    focuseIndex !== null &&
    startIndex - focuseIndex > 0 &&
    focuseIndex >= sectionIndex;

  return isDraggingStatus || tommorrowIndexes.includes(sectionIndex);
};
