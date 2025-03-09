import { useCallback, useEffect, useMemo, useState } from 'react';

import { compactTimeList } from '@/shared/consts/timeList';
import { theme } from '@/shared/styles';

import { getDefaultTimes } from '../../lib/getDefaultTimes';
import {
  CLOCK_INNER_RADIUS,
  CLOCK_RADIUS,
  DAY_BUTTONS,
} from '../../model/consts';
import { Day, DraggingRangeStatus, Time } from '../../model/types';

import { HourSections } from './HourSections/HourSections';
import { TimeDivider } from './TimeDivider/TimeDivider';
import { TimeHeader } from './TimeHeader/TimeHeader';
import { TimeRanges } from './TimeRanges/TimeRanges';
import { S, C } from './TimeSelector.style';

type TimeSelectorProps = {
  isOpen: boolean;
  times: Time[];
  day: Day;
  onChangeTimes: (newTimes: Time[] | ((prevTimes: Time[]) => Time[])) => void;
  onChangeDay: (newDay: Day | ((prevDay: Day) => Day)) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export const TimeSelector = ({
  isOpen,
  times,
  day,
  onChangeTimes,
  onChangeDay,
  onClose,
  onSubmit,
}: TimeSelectorProps) => {
  const [draggingStartHour, setDraggingStartHour] = useState<number | null>(
    null
  );
  const [draggingEndHour, setDraggingEndHour] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [removeRange, setRemoveRange] = useState<null | number>(null);
  const [draggingRangeStatus, setDraggingRangeStatus] =
    useState<DraggingRangeStatus>('currentDay');

  const isDefaultTime = times[0]?.isDefault ?? false;
  const visibleTimeText = useMemo(
    () =>
      findVisibleTimeText(
        times,
        draggingStartHour,
        draggingEndHour,
        isDefaultTime
      ),
    [draggingEndHour, draggingStartHour, times, isDefaultTime]
  );
  const tomorrowTime = times.find((v) => v.isNextDay);
  const selectedTimeText = getSelectedTimeText(day, times);

  const handlePointerDown = (pointerHour: number) => {
    if (!isDefaultTime) {
      const targetRangeIndex = times.findIndex((time) =>
        time.ranges.includes(pointerHour)
      );

      if (targetRangeIndex >= 0) {
        setRemoveRange(targetRangeIndex);
        return;
      }
    }

    setIsDragging(true);
    setRemoveRange(null);
    setDraggingStartHour(pointerHour);
    setDraggingEndHour(pointerHour);

    const newTime = {
      startTime: compactTimeList[pointerHour],
      endTime: null,
      ranges: [pointerHour],
    };

    onChangeTimes((prev) => (isDefaultTime ? [newTime] : [...prev, newTime]));
  };

  const handlePointerMove = (pointerHour: number) => {
    if (!isDragging || draggingStartHour === null) return;

    const isNextDay = draggingStartHour > pointerHour;
    const earliestStartHour = times[0].ranges[0];
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

  const handlePointerEnd = useCallback(() => {
    if (draggingStartHour === null || draggingEndHour === null) {
      return;
    }

    onChangeTimes((prev) => {
      const earliestStartHour = prev[0].ranges[0];
      const newTime = prev[prev.length - 1];
      let endHour =
        draggingRangeStatus !== 'impossible'
          ? draggingEndHour
          : earliestStartHour - 1;

      if (endHour < 0) endHour = 23;

      const updatedNewTime: Time = {
        ...newTime,
        endTime: compactTimeList[endHour],
        ranges: generateTimeRange(newTime.ranges[0], endHour),
        isNextDay: newTime.ranges[0] > endHour,
      };

      const addedTimes = [...prev.slice(0, -1), updatedNewTime] //
        .sort((a, b) => a.ranges[0] - b.ranges[0]);

      return mergeOverlappingTimes(addedTimes);
    });

    setIsDragging(false);
    setDraggingStartHour(null);
    setDraggingEndHour(null);
    setDraggingRangeStatus('currentDay');
  }, [draggingStartHour, draggingEndHour, draggingRangeStatus, onChangeTimes]);

  const handleDelete = () => {
    if (removeRange === null) return;

    if (removeRange >= 0) {
      const filteredTimes = times.filter((_, i) => i !== removeRange);
      onChangeTimes(
        filteredTimes.length === 0 ? getDefaultTimes() : filteredTimes
      );
      setRemoveRange(null);
      setDraggingEndHour(null);
    }
  };

  const handleDeleteButtonClick = () => {
    onChangeTimes(getDefaultTimes);
  };

  const handleDayButtonClick = (type: Day) => () => {
    onChangeDay(type);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerEnd);

    return () => {
      window.removeEventListener('pointerup', handlePointerEnd);
    };
  }, [handlePointerEnd]);

  return (
    <S.TimeSelectorWrap $isOpen={isOpen}>
      <TimeHeader onClose={onClose} />
      <S.Content>
        <S.DayWrap>
          <S.Heading>날짜</S.Heading>
          <S.ButtonWrap>
            {DAY_BUTTONS.map((button) => (
              <C.DayButton
                key={button.type}
                $isSelected={day === button.type}
                onClick={handleDayButtonClick(button.type)}
              >
                {button.text}
              </C.DayButton>
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
                    ? '#FFC8C0'
                    : theme.colors.blueGrey[200]
                }
                strokeWidth={4}
                pathLength={8}
                strokeDasharray={'0.7 0.3'}
                strokeDashoffset={0.85}
              />
              <TimeDivider />

              <TimeRanges
                times={times}
                isDragging={isDragging}
                draggingStartHour={draggingStartHour}
                draggingEndHour={draggingEndHour}
                dragRangeStatus={draggingRangeStatus}
              />

              <HourSections
                visibleTimeText={visibleTimeText}
                tomorrowTime={tomorrowTime}
                draggingStartHour={draggingStartHour}
                draggingEndHour={draggingEndHour}
                isDragging={isDragging}
                dragRangeStatus={draggingRangeStatus}
                onPointerDown={handlePointerDown}
                onDelete={handleDelete}
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

          {times.length > 0 && (
            <S.SelectedTimeText $isDefaultTime={isDefaultTime}>
              <span>{selectedTimeText}</span>
            </S.SelectedTimeText>
          )}
        </S.ClockWrap>
      </S.Content>

      <C.SubmitButton disabled={isDefaultTime} onClick={onSubmit}>
        이 시간대에 맞는 옷차림 찾기
      </C.SubmitButton>
    </S.TimeSelectorWrap>
  );
};

/** 주어진 시작 시간과 끝 시간 사이의 모든 시간을 포함하는 배열을 생성 */
function generateTimeRange(startHour: number, endHour: number) {
  const ranges = [startHour];

  for (let hour = startHour; hour !== endHour; ) {
    hour = (hour + 1) % 24;
    ranges.push(hour);
  }

  return ranges;
}

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
  const endHour = isNextDay
    ? combined.findIndex((hour) => hour === time1.ranges[0]) - 1
    : combined[combined.length - 1];

  return {
    startTime: compactTimeList[time1.ranges[0]],
    endTime: compactTimeList[endHour],
    ranges: generateTimeRange(time1.ranges[0], endHour),
    isNextDay: isNextDay,
  };
}

// 시간 텍스트의 visible 범위 계산
const findVisibleTimeText = (
  times: Time[],
  focussingStartHour: number | null,
  focusingEndHour: number | null,
  isDefaultTime: boolean
): [number[], number[]] => {
  const allIndexes = new Set();
  const bothEnds: number[] = []; // 각 범위의 양 끝단

  if (
    typeof focussingStartHour === 'number' &&
    typeof focusingEndHour === 'number'
  ) {
    const draggingIndexes = generateTimeRange(
      focussingStartHour,
      focusingEndHour
    );

    draggingIndexes.forEach((index) => {
      allIndexes.add(index);
    });
  }

  if (!isDefaultTime) {
    times.forEach((time) => {
      bothEnds.push(time.ranges[0], time.ranges.at(-1) as number);
      time.ranges.forEach((index) => {
        allIndexes.add(index);
      });
    });
  }

  // 3의 배수이면서 사용자가 선택하지 않은 시간대의 텍스트
  const alwaysVisible = [];
  for (let i = 0; i < 24; i += 3) {
    if (!allIndexes.has(i)) {
      alwaysVisible.push(i);
    }
  }

  return [alwaysVisible, bothEnds];
};

// 선택된 시간대 텍스트 생성
function getSelectedTimeText(day: Day, times: Time[]) {
  if (times.length === 0 || !times[0].endTime) return '';

  const formatTimeZone = (
    startTime: string,
    endTime: string | null,
    isNextDay?: boolean
  ) => {
    if (endTime === null) return '';
    const isSameAMPM = startTime.slice(0, 2) === endTime.slice(0, 2);
    const nextDay = isNextDay ? '다음날' : '';
    const endHour = endTime.slice(isSameAMPM ? 3 : 0);

    return `${startTime} - ${nextDay} ${endHour}`;
  };

  const formattedTimes = times.map(({ startTime, endTime, isNextDay }) =>
    formatTimeZone(startTime, endTime, isNextDay)
  );

  let timeText = '';
  if (times.length === 1) {
    timeText = formattedTimes[0];
  } else if (times.length === 2) {
    timeText = formattedTimes.join(', ');
  } else if (times.length >= 3) {
    timeText = `${formattedTimes[0]} ··· ${
      formattedTimes[formattedTimes.length - 1]
    }`;
  }

  return `${day} ${timeText}`;
}
