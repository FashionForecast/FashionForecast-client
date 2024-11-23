import Pop0Icon from './Pop0Icon';
import Pop10Icon from './Pop10Icon';
import Pop20Icon from './Pop20Icon';
import Pop30Icon from './Pop30Icon';
import Pop40Icon from './Pop40Icon';
import Pop50Icon from './Pop50Icon';
import Pop60Icon from './Pop60Icon';
import Pop70Icon from './Pop70Icon';
import Pop80Icon from './Pop80Icon';
import Pop90Icon from './Pop90Icon';
import Pop100Icon from './Pop100Icon';

type PopIconProps = {
  maximumPop: number;
};

/**
 * 강수확률에 따른 아이콘 표시
 */
const PopIcon = ({ maximumPop }: PopIconProps) => {
  if (maximumPop <= 0) return <Pop0Icon />;
  if (maximumPop < 20) return <Pop10Icon />;
  if (maximumPop < 30) return <Pop20Icon />;
  if (maximumPop < 40) return <Pop30Icon />;
  if (maximumPop < 50) return <Pop40Icon />;
  if (maximumPop < 60) return <Pop50Icon />;
  if (maximumPop < 70) return <Pop60Icon />;
  if (maximumPop < 80) return <Pop70Icon />;
  if (maximumPop < 90) return <Pop80Icon />;
  if (maximumPop < 100) return <Pop90Icon />;
  return <Pop100Icon />;
};

export default PopIcon;
