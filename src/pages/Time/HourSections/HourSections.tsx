import { TIME_LIST } from '@/constants/timeList';
import SectionArea from './SectionArea/SectionArea';
import SectionText from './SectionText/SectionText';

type HourSectionsProps = {
  visibleTimeText: [number[], number[]];
  focusedTimeIndex: number | null;
  handlePointerDown: (index: number) => void;
  handlePointerMove: (index: number) => void;
  handleDelete: () => void;
};

const HourSections = ({
  visibleTimeText,
  focusedTimeIndex,
  handlePointerDown,
  handlePointerMove,
  handleDelete,
}: HourSectionsProps) => {
  const center = 170; // SVG 중심 좌표 (x, y)

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
        {TIME_LIST.map((_, i) => (
          <SectionArea
            key={i}
            index={i}
            sections={TIME_LIST.length}
            center={center}
            handlePointerDown={handlePointerDown}
            handleDelete={handleDelete}
          />
        ))}
      </g>
      {TIME_LIST.map((time, i) => (
        <SectionText
          key={time}
          time={time}
          index={i}
          center={center}
          visibleTimeText={visibleTimeText}
          focusedTimeIndex={focusedTimeIndex}
        />
      ))}
    </svg>
  );
};

export default HourSections;
