import ColdIcon from './ColdIcon';
import CoolIcon from './CoolIcon';
import HotIcon from './HotIcon';
import ModerateIcon from './ModerateIcon';
import WarmIcon from './WarmIcon';

type TemperatureIconProps = {
  extremumTmp: number;
};

/**
 * 기온에 따른 아이콘 표시
 */
const TemperatureIcon = ({ extremumTmp }: TemperatureIconProps) => {
  if (extremumTmp <= 16) return <ColdIcon />;
  if (extremumTmp <= 19) return <CoolIcon />;
  if (extremumTmp <= 22) return <ModerateIcon />;
  if (extremumTmp <= 27) return <WarmIcon />;
  return <HotIcon />;
};

export default TemperatureIcon;
