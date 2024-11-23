import PcpClearIcon from './PcpClearIcon';
import PcpRaindropIcon from './PcpRaindropIcon';
import PcpRainIcon from './PcpRainIcon';

type PcpIconProps = {
  maximumPcp: number;
};

/**
 * 강수량에 따른 아이콘 표시
 */
const PcpIcon = ({ maximumPcp }: PcpIconProps) => {
  if (maximumPcp <= 0) return <PcpClearIcon />;
  if (maximumPcp < 3) return <PcpRaindropIcon />;
  return <PcpRainIcon />;
};

export default PcpIcon;
