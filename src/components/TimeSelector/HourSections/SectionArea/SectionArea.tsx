import { S } from './SectionArea.style';

type SectionAreaProps = {
  index: number;
  sections: number;
  center: number;
  handlePointerDown: (index: number) => void;
  handleDelete: () => void;
};

const SectionArea = ({
  index,
  sections,
  center,
  handlePointerDown,
  handleDelete,
}: SectionAreaProps) => {
  const angleStep = 360 / sections; // 각 구역의 중심 각
  const radius = 170; // 원의 반지름
  const innerRadius = 100; // 중앙의 비어 있는 영역 반지름

  const startAngle = index * angleStep;
  const endAngle = startAngle + angleStep;

  const outerStart = polarToCartesian(center, center, radius, startAngle);
  const outerEnd = polarToCartesian(center, center, radius, endAngle);

  const innerStart = polarToCartesian(center, center, innerRadius, startAngle);
  const innerEnd = polarToCartesian(center, center, innerRadius, endAngle);

  const largeArcFlag = angleStep > 180 ? 1 : 0;

  return (
    <S.Section
      key={index}
      data-index={index}
      d={`
          M ${outerStart.x} ${outerStart.y}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
          Z
        `}
      // fill={`hsl(${(i / sections) * 360}, 70%, 50%)`}
      fill={'transparent'} // 색상 적용
      stroke='none'
      onPointerDown={() => handlePointerDown(index)}
      onClick={handleDelete}
    />
  );
};

export default SectionArea;

// 극좌표를 직교 좌표로 변환하는 함수
const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number
) => {
  const radian = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + radius * Math.cos(radian),
    y: cy + radius * Math.sin(radian),
  };
};
