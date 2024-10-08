import MenuItem from '../MenuItem';
import ClockIcon from '@/assets/svg/clock.svg?react';

const TimeSetMenu = () => {
  return (
    <MenuItem
      title='기본 외출시간'
      value='오늘 오전 08시 - 오후 07시'
      icon={<ClockIcon />}
    />
  );
};

export default TimeSetMenu;
