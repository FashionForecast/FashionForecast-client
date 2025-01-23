import { TIME_LIST } from '@/constants/timeList';
import { S } from '../TimePage.style';
import { calcTimeRange, Time } from '../TimePage';

type SelectedRangeProps = {
  time: Time;
};

const SelectedRange = ({ time }: SelectedRangeProps) => {
  const { startTime, endTime } = time;
  const startIndex = TIME_LIST.findIndex((item) => item === startTime);
  const endIndex = TIME_LIST.findIndex((item) => item === endTime);
  const diff = calcTimeRange(startIndex, endIndex);
  // const centerX = 0; // 시계 중심 X 좌표
  // const centerY = 0; // 시계 중심 Y 좌표
  // const radius = 100; // 시계 반지름
  // const angle = -90 + startIndex * 15; // 각도 계산
  // const x = centerX + (radius + 26) * Math.cos((angle * Math.PI) / 180); // 숫자는 원 바깥쪽에
  // const y = centerY + (radius + 26) * Math.sin((angle * Math.PI) / 180);

  return (
    <S.TimeRange
      $degree={-90 + startIndex * 15}
      $range={diff}
      cx={'0'}
      cy={'0'}
      r={'144'}
      fill='transparent'
      stroke='#627384'
      strokeWidth={40}
      strokeLinecap='round'
    />
  );
};

export default SelectedRange;
