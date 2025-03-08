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
  const tomorrowTime = times.find((v) => v.isTomorrow);
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
      const canMerge = draggingRangeStatus !== 'impossible';

      let endHour = canMerge ? draggingEndHour : earliestStartHour - 1;
      if (endHour < 0) endHour = 23;

      const updatedNewTime = [
        ...prev.slice(0, -1),
        {
          ...newTime,
          endTime: compactTimeList[endHour],
          ranges: generateTimeRange(newTime.ranges[0], endHour),
        },
      ];

      return mergeOverlappingRanges(updatedNewTime, draggingStartHour);
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

/** 겹치는 시간대 병합 함수 */
function mergeOverlappingRanges(times: Time[], startHour: number) {
  const list = [...times];

  let i = 0;
  while (i < list.length) {
    let hasMerged = false; // 현재 인덱스에서 병합이 발생했는지 추적

    for (let j = i + 1; j < list.length; j++) {
      // 겹치는 `ranges`가 있는지 확인
      if (hasOverlap(list[i].ranges, list[j].ranges)) {
        // 병합된 ranges 계산
        const mergedRanges = mergeRanges(
          list[i].ranges,
          list[j].ranges,
          startHour
        );

        // 병합 데이터 업데이트
        list[i] = {
          startTime: compactTimeList[mergedRanges[0]],
          endTime: compactTimeList[mergedRanges.at(-1)!],
          ranges: mergedRanges,
        };

        // 병합된 항목 제거
        list.splice(j, 1);
        hasMerged = true;
        break; // 병합 후 다시 i번째 요소부터 시작
      }
    }

    // 병합이 없었으면 다음 요소로 이동
    if (!hasMerged) {
      i++;
    }
  }

  // 시작시간을 기준으로 오름차순 정렬
  const sorted = list.sort((a, b) => a.ranges[0] - b.ranges[0]);
  const lastIndexes = sorted.at(-1)?.ranges;

  // 마지막 시간대가 내일 여부 판별
  if (
    startHour !== 0 &&
    lastIndexes?.includes(0) &&
    lastIndexes?.includes(23)
  ) {
    sorted[sorted.length - 1] = {
      ...sorted[sorted.length - 1],
      isTomorrow: true,
    };
  }

  return sorted;
}

/** 두 배열에서 겹치는 요소가 있는지 확인 */
function hasOverlap(arr1: number[], arr2: number[]) {
  return arr1.some((item) => arr2.includes(item));
}

/** 두 `ranges` 배열을 병합하고 필요한 시간 계산 */
function mergeRanges(ranges1: number[], ranges2: number[], startHour: number) {
  const combined = [...new Set([...ranges1, ...ranges2])].sort((a, b) => a - b);

  // 자정(23->0) 간 시간 병합 처리
  const isTomorrow =
    startHour !== 0 && combined.includes(0) && combined.includes(23);
  const endIndex = combined.findIndex((value) => value === startHour);

  return generateTimeRange(
    isTomorrow ? startHour : combined[0],
    isTomorrow ? endIndex - 1 : combined.at(-1)!
  );
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
    isTomorrow?: boolean
  ) => {
    if (endTime === null) return '';
    const isSameAMPM = startTime.slice(0, 2) === endTime.slice(0, 2);
    const tomorrowText = isTomorrow ? '다음날' : '';
    const endText = endTime.slice(isSameAMPM ? 3 : 0);

    return `${startTime} - ${tomorrowText} ${endText}`;
  };

  const formattedTimes = times.map(({ startTime, endTime, isTomorrow }) =>
    formatTimeZone(startTime, endTime, isTomorrow)
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
