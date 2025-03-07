import { CLOCK_RADIUS } from '@/widgets/time/model/consts';

import { S } from './SectionArea.style';

type SectionAreaProps = {
  index: number;
  onPointerDown: (index: number) => void;
  onDelete: () => void;
};

const RADIUS = 170; // 바깥 원의 반지름
const INNER_RADIUS = 100; // 비어 있는 내부 원의 반지름
const ANGLE = 15; // 한 영역의 각

export const SectionArea = ({
  index,
  onPointerDown,
  onDelete,
}: SectionAreaProps) => {
  const startAngle = index * ANGLE;
  const endAngle = startAngle + ANGLE;

  const outerStart = polarToCartesian(RADIUS, startAngle);
  const outerEnd = polarToCartesian(RADIUS, endAngle);

  const innerStart = polarToCartesian(INNER_RADIUS, startAngle);
  const innerEnd = polarToCartesian(INNER_RADIUS, endAngle);

  return (
    <S.Section
      key={index}
      data-index={index}
      d={`
          M ${outerStart.x} ${outerStart.y}
          A ${RADIUS} ${RADIUS} 0 0 1 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${innerStart.x} ${innerStart.y}
          Z
        `}
      fill={'transparent'}
      // fill={`hsl(${(index / 24) * 360}, 70%, 50%)`}
      stroke='none'
      onPointerDown={() => onPointerDown(index)}
      onClick={onDelete}
    />
  );
};

// 극좌표를 직교 좌표로 변환하는 함수
const polarToCartesian = (radius: number, angle: number) => {
  const radian = (-90 + angle) * (Math.PI / 180);
  return {
    x: CLOCK_RADIUS + radius * Math.cos(radian),
    y: CLOCK_RADIUS + radius * Math.sin(radian),
  };
};
