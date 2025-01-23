import { S } from './SectionText.style';

type SectionTextProps = {
  time: string;
  index: number;
  center: number;
};

const SectionText = ({ time, index, center }: SectionTextProps) => {
  const [AMPM, hour] = time.split(' ');
  const radius = 144;
  const angle = -90 + index * 15; // 각도 계산
  const x = center + radius * Math.cos((angle * Math.PI) / 180); // 숫자는 원 바깥쪽에
  const y = center + radius * Math.sin((angle * Math.PI) / 180);

  return (
    <S.HourText key={time} x={x} y={y} textAnchor='middle' fill='#333'>
      <tspan x={x} dy={-2}>
        {AMPM}
      </tspan>
      <tspan x={x} dy={12}>
        {hour}
      </tspan>
    </S.HourText>
  );
};

export default SectionText;
