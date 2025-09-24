import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Time } from '@/entities/time';

import { compactTimeList } from '@/shared/consts/timeList';
import { useAppSelector } from '@/shared/lib';
import { theme } from '@/shared/styles';
import { ToggleButton } from '@/shared/ui';

import { getDefaultTimes } from '../../../../entities/time/lib/getDefaultTimes';
import { generateTimeRange } from '../../lib/generateTimeRange';
import { getFormattedTimeRanges } from '../../lib/getFormattedTimeRanges';
import { CLOCK_INNER_RADIUS, CLOCK_RADIUS } from '../../model/consts';
import { Day, DraggingRangeStatus } from '../../model/types';

import { HourSections } from './HourSections/HourSections';
import { TimeHeader } from './TimeHeader/TimeHeader';
import { TimeRanges } from './TimeRanges/TimeRanges';
import { S, C } from './TimeSelector.style';

const DAY_BUTTONS: Day[] = ['오늘', '내일', '모레'];

type TimeSelectorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTimes: Time[], newDay: Day) => void;
};

export const TimeSelector = memo(
  ({ isOpen, onClose, onSubmit }: TimeSelectorProps) => {
    const selectedTimes = useAppSelector((state) => state.times.selected);

    const [clockTimes, setClockTimes] = useState(selectedTimes);
    const [day, setDay] = useState<Day>('오늘');
    const [draggingStartHour, setDraggingStartHour] = useState<number | null>(
      null
    );
    const [draggingEndHour, setDraggingEndHour] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [deleteRange, setDeleteRange] = useState<null | number>(null);
    const [draggingRangeStatus, setDraggingRangeStatus] =
      useState<DraggingRangeStatus>('currentDay');

    const isDefaultTime = clockTimes[0].isDefault;
    const selectedTimesText = useMemo(
      () => formatSelectedTimesText(clockTimes, day),
      [clockTimes, day]
    );

    const handlePointerDown = (pointerHour: number) => {
      if (!isDefaultTime) {
        const deleteTarget = clockTimes.findIndex((time) =>
          time.ranges.includes(pointerHour)
        );

        if (deleteTarget >= 0) {
          setDeleteRange(deleteTarget);
          return;
        }
      }

      setIsDragging(true);
      setDeleteRange(null);
      setDraggingStartHour(pointerHour);
      setDraggingEndHour(pointerHour);

      const newTime = {
        startTime: compactTimeList[pointerHour],
        endTime: null,
        ranges: [pointerHour],
      };

      setClockTimes((prev) => (isDefaultTime ? [newTime] : [...prev, newTime]));
    };

    const handlePointerMove = (pointerHour: number) => {
      if (!isDragging || draggingStartHour === null) return;

      const isNextDay = draggingStartHour > pointerHour;
      const earliestStartHour = clockTimes[0].ranges[0];
      let draggingRangeStatus: DraggingRangeStatus = 'currentDay';

      if (isNextDay) {
        setDraggingEndHour(Math.min(pointerHour, earliestStartHour));
        draggingRangeStatus =
          pointerHour >= earliestStartHour ? 'impossible' : 'nextDay';
      } else {
        setDraggingEndHour(pointerHour);
      }

      setDraggingRangeStatus(draggingRangeStatus);
    };

    const handlePointerUp = useCallback(() => {
      if (draggingStartHour === null || draggingEndHour === null) {
        return;
      }

      setClockTimes((prev) => {
        const earliestStartHour = prev[0].ranges[0];
        const newTime = prev[prev.length - 1];
        const startHour = newTime.ranges[0];
        let endHour =
          draggingRangeStatus !== 'impossible'
            ? draggingEndHour
            : earliestStartHour - 1;

        if (endHour < 0) endHour = 23;

        const updatedNewTime: Time = {
          ...newTime,
          endTime: compactTimeList[endHour],
          ranges: generateTimeRange(startHour, endHour),
          isNextDay: startHour > endHour,
        };

        const addedTimes = [...prev.slice(0, -1), updatedNewTime] //
          .sort((a, b) => a.ranges[0] - b.ranges[0]);

        return mergeOverlappingTimes(addedTimes);
      });

      setIsDragging(false);
      setDraggingStartHour(null);
      setDraggingEndHour(null);
      setDraggingRangeStatus('currentDay');
    }, [draggingStartHour, draggingEndHour, draggingRangeStatus]);

    const handleDeleteRangeClick = () => {
      if (deleteRange === null) return;

      const filteredTimes = clockTimes.filter(
        (_, index) => index !== deleteRange
      );
      const newTimes =
        filteredTimes.length === 0 ? getDefaultTimes() : filteredTimes;

      setClockTimes(newTimes);
      setDeleteRange(null);
    };

    const handleDeleteButtonClick = () => {
      setClockTimes(getDefaultTimes);
    };

    const handleDayButtonClick = (type: Day) => () => {
      setDay(type);
    };

    useEffect(() => {
      window.addEventListener('pointerup', handlePointerUp);

      return () => {
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }, [handlePointerUp]);

    return (
      <S.TimeSelectorWrap $isOpen={isOpen}>
        <TimeHeader onClose={onClose} />

        <S.Content>
          <S.DayWrap>
            <S.Heading>날짜</S.Heading>
            <S.ButtonWrap>
              {DAY_BUTTONS.map((value) => (
                <ToggleButton
                  key={value}
                  color='primary'
                  value={value}
                  size='large'
                  selected={value === day}
                  onClick={handleDayButtonClick(value)}
                >
                  {value}
                </ToggleButton>
              ))}
            </S.ButtonWrap>
          </S.DayWrap>
          <S.ClockWrap>
            <S.Heading>외출시간</S.Heading>

            <S.Clock>
              <S.ClockFace
                width={CLOCK_RADIUS * 2}
                height={CLOCK_RADIUS * 2}
                viewBox={`-${CLOCK_RADIUS} -${CLOCK_RADIUS} 
              ${CLOCK_RADIUS * 2} ${CLOCK_RADIUS * 2}`}
              >
                <circle
                  r={CLOCK_INNER_RADIUS}
                  fill='none'
                  stroke={
                    draggingRangeStatus === 'impossible'
                      ? theme.colors.error.light
                      : theme.colors.blueGrey[200]
                  }
                  strokeWidth={4}
                  pathLength={8}
                  strokeDasharray={'0.7 0.3'}
                  strokeDashoffset={0.85}
                />

                <TimeRanges
                  times={clockTimes}
                  isDragging={isDragging}
                  draggingStartHour={draggingStartHour}
                  draggingEndHour={draggingEndHour}
                  draggingRangeStatus={draggingRangeStatus}
                />

                <HourSections
                  times={clockTimes}
                  isDragging={isDragging}
                  draggingStartHour={draggingStartHour}
                  draggingEndHour={draggingEndHour}
                  draggingRangeStatus={draggingRangeStatus}
                  onPointerDown={handlePointerDown}
                  onDeleteRange={handleDeleteRangeClick}
                  onPointerMove={handlePointerMove}
                />
              </S.ClockFace>

              <S.PhraseWrap>
                {isDefaultTime && (
                  <div>
                    <S.DefaultPhrase>
                      가장 먼저 외출하는 <br />
                      시간부터 지정하세요.
                    </S.DefaultPhrase>
                  </div>
                )}

                {!isDefaultTime && (
                  <S.CountingPhraseWrap>
                    <p>개수 상관없이 마음껏 지정하세요.</p>
                    <C.DeleteButton
                      variant='outlined'
                      size='large'
                      onClick={handleDeleteButtonClick}
                    >
                      모두 지우기
                    </C.DeleteButton>
                  </S.CountingPhraseWrap>
                )}
              </S.PhraseWrap>
            </S.Clock>

            {clockTimes.length > 0 && (
              <S.SelectedTimeText $isDefaultTime={isDefaultTime}>
                <span>{selectedTimesText}</span>
              </S.SelectedTimeText>
            )}
          </S.ClockWrap>
        </S.Content>

        <C.SubmitButton
          size='large'
          disabled={isDefaultTime}
          onClick={() => onSubmit(clockTimes, day)}
        >
          이 시간대에 맞는 옷차림 찾기
        </C.SubmitButton>
      </S.TimeSelectorWrap>
    );
  }
);

/** 겹치는 시간대가 존재하면 하나의 시간대로 병합 */
function mergeOverlappingTimes(times: Time[]) {
  const list = [...times];

  for (let i = 0; i < list.length; ) {
    let isMerged = false;

    for (let j = i + 1; j < list.length; j++) {
      if (hasOverlap(list[i], list[j])) {
        list[i] = mergeTwoTime(list[i], list[j]);

        list.splice(j, 1); // 병합된 time 제거
        isMerged = true;
        break;
      }
    }

    if (!isMerged) {
      i++;
    }
  }

  return list;
}

/** 두 시간대가 겹치는지 확인 */
function hasOverlap(time1: Time, time2: Time) {
  return time1.ranges.some((item) => time2.ranges.includes(item));
}

/** 두 시간대를 하나로 병합 */
function mergeTwoTime(time1: Time, time2: Time): Time {
  const combined = [...new Set([...time1.ranges, ...time2.ranges])] //
    .sort((a, b) => a - b);
  const isNextDay = time1.isNextDay || time2.isNextDay;
  const startHour = time1.ranges[0];
  const endHour = isNextDay
    ? combined.findIndex((hour) => hour === startHour) - 1
    : combined[combined.length - 1];

  return {
    startTime: compactTimeList[startHour],
    endTime: compactTimeList[endHour],
    ranges: generateTimeRange(startHour, endHour),
    isNextDay: isNextDay,
  };
}

/** 선택된 시간대를 한 줄 텍스트로 포맷 */
function formatSelectedTimesText(times: Time[], day: Day) {
  function hasComma(index: number) {
    if (formattedRanges.length >= 4) return false;

    const isMiddleIndex = index >= 1 && index <= formattedRanges.length - 2;
    return isMiddleIndex;
  }

  const formattedRanges = getFormattedTimeRanges({
    times,
    day,
    isCompact: true,
  });

  let text = '';
  formattedRanges.forEach(
    (time, index) => (text += `${time}${hasComma(index) ? ',' : ''}` + ' ')
  );

  return text;
}
