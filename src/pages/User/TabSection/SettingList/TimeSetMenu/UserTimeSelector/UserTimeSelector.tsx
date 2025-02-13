import { paddedTimeList } from '@/constants/timeList';
import { SelectedTime } from '@/pages/Home/ui/Page/HomePage';
import TimeCarousel from '@/pages/Home/TimeSelector/TimeCarousel/TimeCarousel';
import { useMemo } from 'react';
import { S } from './UserTimeSelector.style';

const DAYS = ['오늘'];

type UserTimeSelectorProps = {
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
}: UserTimeSelectorProps) => {
  const endTimes = useMemo(
    () => paddedTimeList.slice(paddedTimeList.indexOf(selectedTime.start)),
    [selectedTime.start]
  );

  return (
    <S.TimeSelector $disabled={disabled}>
      <TimeCarousel
        times={DAYS}
        type='day'
        selectedTime={selectedTime.day}
        updateSelectedTime={updateSelectedTime}
      />

      <TimeCarousel
        times={paddedTimeList}
        type='start'
        selectedTime={selectedTime.start}
        updateSelectedTime={updateSelectedTime}
      />

      <S.Hypen />

      <TimeCarousel
        times={endTimes}
        type='end'
        selectedTime={selectedTime.end}
        updateSelectedTime={updateSelectedTime}
      />
    </S.TimeSelector>
  );
};

export default UserTimeSelector;
