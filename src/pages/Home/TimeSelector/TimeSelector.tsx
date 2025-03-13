import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import { paddedTimeList } from '@/shared/consts/timeList';
import { KSTDate } from '@/shared/lib';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { CheckIcon } from '@/shared/ui';

import TimeCarousel from './TimeCarousel/TimeCarousel';
import { C, S } from './TimeSelector.style';

const DAYS = ['오늘', '내일'];

export type SelectedTime = {
  day: '오늘' | '내일';
  start: string;
  end: string;
};

type TimeSelectorProps = {
  selectedTime: SelectedTime;
  updateSelectedTime: (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => void;
};

function TimeSelector({ selectedTime, updateSelectedTime }: TimeSelectorProps) {
  const [isChange, setIsChange] = useState(false);
  const initialTime = useRef(selectedTime);
  const queryClient = useQueryClient();
  const currentHour = KSTDate().getHours();
  const snackbar = useSnackbar();

  const startTimes = useMemo(
    () =>
      selectedTime.day === '오늘'
        ? paddedTimeList.slice(currentHour)
        : paddedTimeList,
    [selectedTime.day, currentHour]
  );

  const endTimes = useMemo(
    () => paddedTimeList.slice(paddedTimeList.indexOf(selectedTime.start)),
    [selectedTime.start]
  );

  const handleButtonClick = () => {
    if (isChange) {
      setIsChange(false);
      initialTime.current = selectedTime;
      queryClient.invalidateQueries({ queryKey: ['weather'] });
      const { day, start, end } = selectedTime;
      snackbar.open(`${day} ${start} - ${end}에 맞는 옷차림이에요!`);
    }
  };

  useEffect(() => {
    if (JSON.stringify(selectedTime) !== JSON.stringify(initialTime.current)) {
      setIsChange(true);
    }
  }, [selectedTime]);

  return (
    <S.TimeSelector>
      <S.TimeRange>
        <TimeCarousel
          times={DAYS}
          type='day'
          selectedTime={selectedTime.day}
          updateSelectedTime={updateSelectedTime}
        />

        <TimeCarousel
          times={startTimes}
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

        <C.CheckButton
          $isChange={isChange}
          disabled={!isChange}
          color='inherit'
          onClick={handleButtonClick}
        >
          <CheckIcon color={isChange ? 'white' : 'disabled'} />
        </C.CheckButton>
      </S.TimeRange>
    </S.TimeSelector>
  );
}

export default TimeSelector;
