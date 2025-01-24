import { TIME_LIST } from '@/constants/timeList';
import { S } from '../TimePage.style';
import { calcTimeRange, calcTimeRangeDegree, Time } from '../TimePage';

type SelectedRangeProps = {
  time: Time;
};

const SelectedRange = ({ time }: SelectedRangeProps) => {
  const { startTime, endTime } = time;
  const startIndex = TIME_LIST.findIndex((item) => item === startTime);
  const endIndex = TIME_LIST.findIndex((item) => item === endTime);
  const degree = calcTimeRangeDegree(startIndex);
  const diff = calcTimeRange(startIndex, endIndex);

  return (
    <>
      <S.TimeRange
        $degree={degree}
        $range={diff}
        cx={'0'}
        cy={'0'}
        r={'144'}
        fill='transparent'
        stroke='#627384'
        strokeWidth={40}
        strokeLinecap='round'
      />
      <path
        d={calculatePath(startIndex, endIndex)}
        fill='none'
        stroke='#95A7BA'
        strokeWidth='2'
        strokeDasharray='5 7'
        strokeLinecap='round'
      />
    </>
  );
};

export default SelectedRange;

function calculatePath(start: number, end: number) {
  if (Math.abs(start - end) <= 1) return;

  const radius = 144;
  const center = 0;

  // -90도: 오전 0시
  const startAngle = start * 15 - 90 + 9;
  const endAngle = end * 15 - 90 - 9;

  const startX = center + radius * Math.cos((Math.PI / 180) * startAngle);
  const startY = center + radius * Math.sin((Math.PI / 180) * startAngle);
  const endX = center + radius * Math.cos((Math.PI / 180) * endAngle);
  const endY = center + radius * Math.sin((Math.PI / 180) * endAngle);

  const largeArcFlag = end - start > 12 ? 1 : 0;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
}
