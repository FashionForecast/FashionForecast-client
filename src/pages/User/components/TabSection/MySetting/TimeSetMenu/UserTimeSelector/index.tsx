import { TIME_LIST } from '@/constants/timeSelector/data';
import { SelectedTime } from '@/pages/Home';
import TimeCarousel from '@/pages/Home/components/TimeSelector/TimeCarousel';
import { useMemo } from 'react';
import { S } from './style';
import useAppSelector from '@/hooks/useAppSelector';

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
  const user = useAppSelector((state) => state.user.info);
  const endTimes = useMemo(
    () => TIME_LIST.slice(TIME_LIST.indexOf(selectedTime.start)),
    [selectedTime.start]
  );

  const startListInitial = useMemo(
    () => TIME_LIST.findIndex((time) => time === user?.outingStartTime),
    [user]
  );

  const endListInitial = useMemo(
    () => TIME_LIST.findIndex((time) => time === user?.outingEndTime),
    [user]
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
        initial={startListInitial >= 0 ? startListInitial : 8}
        updateSelectedTime={updateSelectedTime}
      />

      <S.Hypen />

      <TimeCarousel
        times={endTimes}
        type='end'
        initial={endListInitial >= 0 ? endListInitial : 19}
        updateSelectedTime={updateSelectedTime}
      />
    </S.TimeSelector>
  );
};

export default UserTimeSelector;
