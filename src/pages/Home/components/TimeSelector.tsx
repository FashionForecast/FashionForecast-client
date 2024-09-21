import { C, S } from './TimeSelector.style';
import { Icon } from '@mui/material';
import CheckIcon from '@/components/icon/Check';
import HyphenIcon from '@/components/icon/Hyphen/index';
import { SelectedTime } from '..';
import TimeCarousel from './TimeCarousel';
import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TIME_LIST } from '@/constants/timeSelector/data';

const DAYS = ['오늘', '내일'];

type TimeSelectorProps = {
  selectedTime: SelectedTime;
  handleSelectedTime: (key: keyof SelectedTime, value: string) => void;
};

function TimeSelector({ selectedTime, handleSelectedTime }: TimeSelectorProps) {
  const [isChange, setIsChange] = useState(false);
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

  const setSelectorChange = () => setIsChange(true);
  const handleButtonClick = () => {
    if (isChange) {
      queryClient.invalidateQueries({ queryKey: ['weather'] });
    }
  };

  return (
    <S.TimeSelector>
      <S.TimeRange>
        <TimeCarousel
          times={DAYS}
          type='day'
          setSelectorChange={setSelectorChange}
          handleSelectedTime={handleSelectedTime}
        />

        <TimeCarousel
          times={startTimes}
          type='start'
          setSelectorChange={setSelectorChange}
          handleSelectedTime={handleSelectedTime}
        />

        <Icon>
          <HyphenIcon />
        </Icon>

        <TimeCarousel
          times={endTimes}
          type='end'
          setSelectorChange={setSelectorChange}
          handleSelectedTime={handleSelectedTime}
        />

        <C.CheckButton
          $isChange={isChange}
          disabled={!isChange}
          onClick={handleButtonClick}
        >
          <CheckIcon color={isChange ? 'white' : 'disabled'} />
        </C.CheckButton>
      </S.TimeRange>
    </S.TimeSelector>
  );
}

export default TimeSelector;
