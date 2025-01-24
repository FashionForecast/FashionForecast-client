import { S } from './SectionText.style';

type SectionTextProps = {
  time: string;
  index: number;
  center: number;
  visibleTimeText: [number[], number[]];
  startTimeIndex: number;
  focusedTimeIndex: number | null;
  tommrowIndexes: number[];
};

const SectionText = ({
  time,
  index,
  center,
  visibleTimeText,
  startTimeIndex,
  focusedTimeIndex,
  tommrowIndexes,
}: SectionTextProps) => {
  const [AMPM, hour] = time.split(' ');
  const radius = 144;
  const angle = -90 + index * 15; // 각도 계산
  const x = center + radius * Math.cos((angle * Math.PI) / 180); // 숫자는 원 바깥쪽에
  const y = center + radius * Math.sin((angle * Math.PI) / 180);
  const [always, bothEnds] = visibleTimeText;
  const isHighlight = bothEnds.includes(index) || focusedTimeIndex === index;
  const isVisibleText = isHighlight || always.includes(index);
  const isTommrow = isTommorrowText(
    startTimeIndex,
    focusedTimeIndex,
    index,
    tommrowIndexes
  );

  return (
    <S.HourText
      key={time}
      x={x}
      y={y}
      textAnchor='middle'
      $isVisible={isVisibleText}
      $isHighlight={isHighlight}
    >
      <tspan x={x} dy={-2}>
        {isTommrow ? '내일' : AMPM}
      </tspan>
      <tspan x={x} dy={12}>
        {hour}
      </tspan>
    </S.HourText>
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
