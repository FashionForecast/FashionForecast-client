import { TIME_LIST } from '@/constants/timeSelector/data';
import { SelectedTime } from '@/pages/Home';
import TimeCarousel from '@/pages/Home/components/TimeSelector/TimeCarousel';
import { useMemo } from 'react';
import { S } from './style';

const DAYS = ['오늘'];

type TimeSelectorProps = {
  selectedTime: SelectedTime;
  disabled: boolean;
  updateSelectedTime: (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => void;
};

const UserTimeSelector = ({
  selectedTime,
  disabled,
  updateSelectedTime,
}: TimeSelectorProps) => {
  const endTimes = useMemo(
    () => TIME_LIST.slice(TIME_LIST.indexOf(selectedTime.start)),
    [selectedTime.start]
  );

  return (
    <S.TimeSelector $disabled={disabled}>
      <TimeCarousel
        times={DAYS}
        type='day'
        updateSelectedTime={updateSelectedTime}
      />

      <TimeCarousel
        times={TIME_LIST}
        type='start'
        initial={8}
        updateSelectedTime={updateSelectedTime}
      />

      <S.Hypen />

      <TimeCarousel
        times={endTimes}
        type='end'
        initial={19}
        updateSelectedTime={updateSelectedTime}
      />
    </S.TimeSelector>
  );
};

export default UserTimeSelector;
