import { useState, useEffect, useRef } from 'react';
import getCurrentKST from '@/utils/time';
import { C, S } from './TimeSelector.style';
import { Icon } from '@mui/material';
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

  const [isInit, setIsInit] = useState<boolean>(false);
  //사용자가 스크롩을 통해 선택한 시작 시간
  const [requestedStartTime, setRequestedStartTime] = useState<string>(
    availableTimes[0]
  );
  //사용자가 스크롩을 통해 선택한 종료 시간
  const [requestedEndTime, setRequestedEndTime] = useState<string>(
    availableTimes[defaultEndTimeIndex]
  );

  const [selectedDay, setSelectedDay] = useState<string>('오늘');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const day = ['오늘', '내일'];

  // useRef를 사용하여 DOM 요소에 접근
  const DayListRef = useRef<HTMLUListElement | null>(null);
  const startListRef = useRef<HTMLUListElement | null>(null);
  const endListRef = useRef<HTMLUListElement | null>(null);

  const itemRef = useRef<HTMLLIElement | null>(null);

  // 처음 렌더링 시에만 실행
  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedDay === '내일') {
      setShowAllTimes(true);
    } else {
      setShowAllTimes(false);
    }
  }, [selectedDay]);

  useEffect(() => {
    // onSubmit 후 초기화된 시간과 현재 선택된 시간이 동일하면 버튼을 비활성화
    if (requestedStartTime === startTime && requestedEndTime === endTime) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [selectedDay, startTime, endTime]);

  const handleSubmit = () => {
    onSubmit(selectedDay, startTime, endTime);

    // 선택된 시간을 requested 값으로 업데이트
    setRequestedStartTime(startTime);
    setRequestedEndTime(endTime);

    // 버튼을 비활성화
    setIsButtonDisabled(true);
  };

  //Todo: 중복 코드 리팩토링 필요
  useEffect(() => {
    const observers: (IntersectionObserver | null)[] = [];

    //dayListRef
    if (DayListRef.current) {
      const listItems = DayListRef.current.querySelectorAll('li');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('highlight');
              if (!isInit) {
                const newSelectedDay = entry.target.innerHTML;
                setSelectedDay(newSelectedDay);
              }
            } else {
              entry.target.classList.remove('highlight');
            }
          });
        },
        {
          root: DayListRef.current,
          threshold: 0.9, // 리스트 아이템의 90% 이상이 보일 때 트리거
        }
      );

      listItems.forEach((item) => observer.observe(item));
      observers.push(observer);
    }

    // startListRef
    if (startListRef.current) {
      const listItems = startListRef.current.querySelectorAll('li');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('highlight');
              if (!isInit) {
                const newStartTime = entry.target.innerHTML;
                setStartTime(newStartTime);

                // startTime의 인덱스를 가져옴
                const startIndex = availableTimes.indexOf(newStartTime);

                // endTime을 설정할 인덱스를 계산 (startTime + 8)
                const newEndTimeIndex = Math.min(
                  startIndex + 8, // 기본으로 8시간 후를 설정
                  availableTimes.length - 1 // 배열 길이를 넘지 않도록 제한
                );

                // 새로운 endTime 설정
                setEndTime(availableTimes[newEndTimeIndex]);
              }
            } else {
              entry.target.classList.remove('highlight');
            }
          });
        },
        {
          root: startListRef.current,
          threshold: 0.9, // 리스트 아이템의 90% 이상이 보일 때 트리거
        }
      );

      listItems.forEach((item) => observer.observe(item));
      observers.push(observer);
    }

    // endListRef
    if (endListRef.current) {
      const listItems = endListRef.current.querySelectorAll('li');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('highlight');
              if (!isInit) {
                setEndTime(entry.target.innerHTML);
                console.log('endTime', endTime);
              }
            } else {
              entry.target.classList.remove('highlight');
            }
          });
        },
        {
          root: endListRef.current,
          threshold: 0.9, // 리스트 아이템의 90% 이상이 보일 때 트리거
        }
      );

      listItems.forEach((item) => observer.observe(item));
      observers.push(observer);
    }

    if (itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setIsInit(true);

    return () => observers.forEach((ob) => ob?.disconnect());
  }, [selectedDay, showAllTimes]);

  return (
    <S.TimeSelector>
      <S.TimeRange>
        {/* Day 선택 부분 */}
        <S.DayList ref={DayListRef}>
          {day.map((day) => (
            <S.Times>{day}</S.Times>
          ))}
        </S.DayList>

        {/* 시작 시간 선택 부분 */}
        <S.TimeList ref={startListRef}>
          {availableTimes.map((time) => (
            <S.Times>{time}</S.Times>
          ))}
        </S.TimeList>

        <Icon>
          <HyphenIcon />
        </Icon>

        {/* 종료 시간 선택 부분 */}
        <S.TimeList ref={endListRef}>
          {availableTimes
            .slice(availableTimes.indexOf(startTime))
            .map((time) =>
              time === endTime ? (
                <S.Times ref={itemRef}>{time}</S.Times>
              ) : (
                <S.Times>{time}</S.Times>
              )
            )}
        </S.TimeList>

        <C.CheckButton onClick={handleSubmit} disabled={isButtonDisabled}>
          <CheckIcon />
        </C.CheckButton>
      </S.TimeRange>
    </S.TimeSelector>
  );
}

export default TimeSelector;
