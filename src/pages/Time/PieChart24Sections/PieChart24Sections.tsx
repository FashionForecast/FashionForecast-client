type PieChart24SectionsProps = {
  handlePointerDown: (index: number) => void;
  handlePointerMove: (index: number) => void;
  handleDelete: () => void;
};

const PieChart24Sections = ({
  handlePointerDown,
  handlePointerMove,
  handleDelete,
}: PieChart24SectionsProps) => {
  const sections = 24; // 총 구역 수
  const radius = 170; // 원의 반지름
  const center = 170; // SVG 중심 좌표 (x, y)
  const innerRadius = 100; // 중앙의 비어 있는 영역 반지름

  // 각 구역의 중심 각
  const angleStep = 360 / sections;

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
      style={{
        border: '1px solid #ccc',
        touchAction: 'none',
        userSelect: 'none',
      }}
      onPointerMove={handlePointerMoveEvent}
    >
      {/* -7도 회전 적용 */}
      <g transform={`rotate(-7, ${center}, ${center})`}>
        {Array.from({ length: sections }).map((_, i) => {
          const startAngle = i * angleStep;
          const endAngle = startAngle + angleStep;

          const outerStart = polarToCartesian(
            center,
            center,
            radius,
            startAngle
          );
          const outerEnd = polarToCartesian(center, center, radius, endAngle);

          const innerStart = polarToCartesian(
            center,
            center,
            innerRadius,
            startAngle
          );
          const innerEnd = polarToCartesian(
            center,
            center,
            innerRadius,
            endAngle
          );

          const largeArcFlag = angleStep > 180 ? 1 : 0;

          return (
            <path
              key={i}
              data-index={i}
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
              onPointerDown={() => handlePointerDown(i)}
              onClick={handleDelete}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart24Sections;
