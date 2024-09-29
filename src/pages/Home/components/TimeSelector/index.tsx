import { C, S } from './style';
import CheckIcon from '@/components/icon/CheckIcon';
import { SelectedTime } from '../..';
import TimeCarousel from './TimeCarousel';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TIME_LIST } from '@/constants/timeSelector/data';

const DAYS = ['오늘', '내일'];

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

  const startTimes = useMemo(
    () =>
      selectedTime.day === '오늘'
        ? TIME_LIST.slice(TIME_LIST.indexOf(selectedTime.start))
        : TIME_LIST,
    [selectedTime.day]
  );

  const endTimes = useMemo(
    () => TIME_LIST.slice(TIME_LIST.indexOf(selectedTime.start)),
    [selectedTime.start]
  );

  const handleButtonClick = () => {
    if (isChange) {
      setIsChange(false);
      initialTime.current = selectedTime;
      queryClient.invalidateQueries({ queryKey: ['weather'] });
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
          updateSelectedTime={updateSelectedTime}
        />

        <TimeCarousel
          times={startTimes}
          type='start'
          updateSelectedTime={updateSelectedTime}
        />

        <S.Hypen />

        <TimeCarousel
          times={endTimes}
          type='end'
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
