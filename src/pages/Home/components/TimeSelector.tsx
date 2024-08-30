import { useState, useEffect } from 'react';
import getCurrentKST from '@/utils/time';
import { C, S } from './TimeSelector.style';
import { ListItem, Icon } from '@mui/material';
import CheckIcon from '@/components/icon/Check';
import HyphenIcon from '@/components/icon/Hyphen/index';

interface TimeSelectorProps {
  onSubmit: (day: string, startTime: string, endTime: string) => void;
}

// 현재 시간 이후의 시간 리스트를 생성하는 함수
const getAvailableTimes = (showAll: boolean, currentHour: number) => {
  const hours = showAll ? 24 : 24 - currentHour;
  return Array.from({ length: hours }, (_, i) => {
    const hour = (currentHour + i) % 24;
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}시`;
  });
};

function TimeSelector({ onSubmit }: TimeSelectorProps) {
  const defaultTime = getCurrentKST();
  const currentHour = new Date(defaultTime).getHours();
  const [showAllTimes, setShowAllTimes] = useState<boolean>(false);

  const availableTimes = getAvailableTimes(showAllTimes, currentHour);
  const defaultEndTimeIndex = Math.min(availableTimes.length - 1, 8);

  const [startTime, setStartTime] = useState<string>(availableTimes[0]);
  const [endTime, setEndTime] = useState<string>(
    availableTimes[defaultEndTimeIndex]
  );
  const [selectedDay, setSelectedDay] = useState<string>('오늘');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const day = ['오늘', '내일'];

  const handleSubmit = () => {
    onSubmit(selectedDay, startTime, endTime);
  };

  useEffect(() => {
    setIsButtonDisabled(startTime === endTime);
    setShowAllTimes(selectedDay === '내일');
  }, [selectedDay, startTime, endTime]);

  return (
    <C.Floating
      open={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <S.TimeSelector>
        {/* Day 선택 부분 */}
        <S.DayScroll>
          <C.ItemList>
            {day.map((day) => (
              <ListItem key={day} onClick={() => setSelectedDay(day)}>
                <C.ItemText primary={day} />
              </ListItem>
            ))}
          </C.ItemList>
        </S.DayScroll>

        {/* 시작 시간 선택 부분 */}
        <S.TimeScroll>
          <C.ItemList>
            {availableTimes.map((time) => (
              <ListItem key={time} onClick={() => setStartTime(time)}>
                <C.ItemText primary={time} />
              </ListItem>
            ))}
          </C.ItemList>
        </S.TimeScroll>
        <Icon>
          <HyphenIcon />
        </Icon>

        {/* 종료 시간 선택 부분 */}
        <S.TimeScroll>
          <C.ItemList>
            {availableTimes
              .slice(availableTimes.indexOf(startTime))
              .map((time) => (
                <ListItem key={time} onClick={() => setEndTime(time)}>
                  <C.ItemText primary={time} />
                </ListItem>
              ))}
          </C.ItemList>
        </S.TimeScroll>
        <C.CheckButton onClick={handleSubmit} disabled={isButtonDisabled}>
          <CheckIcon />
        </C.CheckButton>
      </S.TimeSelector>
    </C.Floating>
  );
}

export default TimeSelector;
