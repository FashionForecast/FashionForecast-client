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
  const [removeHour, setRemoveHour] = useState<null | number>(null);
  const [draggingRangeStatus, setDraggingRangeStatus] =
    useState<DraggingRangeStatus>('today');

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

  const handlePointerDown = (startHour: number) => {
    setRemoveHour(null);

    const hasRemoveTarget = () => {
      const target = times.findIndex((time) => time.ranges.includes(startHour));

      if (target >= 0) {
        setRemoveHour(target);
        return true;
      }
      return false;
    };

    if (!isDefaultTime && hasRemoveTarget()) {
      return;
    }

    setIsDragging(true);
    setDraggingStartHour(startHour);
    setDraggingEndHour(startHour);
    onChangeTimes((prev) => {
      const newTime = {
        startTime: compactTimeList[startHour],
        endTime: null,
        ranges: [startHour],
      };

      return isDefaultTime ? [newTime] : [...prev, newTime];
    });
  };

  const handlePointerMove = (pointerTime: number) => {
    if (!isDragging || draggingStartHour === null) return;

    const isTomorrow = draggingStartHour > pointerTime;

    if (isTomorrow)
      setDraggingEndHour(Math.min(pointerTime, times[0].ranges[0]));
    else setDraggingEndHour(pointerTime);

    setDraggingRangeStatus(
      updateDragRangeStatus(draggingStartHour, pointerTime, times[0].ranges[0])
    );
  };

  const handlePointerEnd = useCallback(() => {
    // 포커스중인 시간이 없거나 삭제 작업이 있으면 종료
    if (
      draggingStartHour === null ||
      draggingEndHour === null ||
      removeHour !== null
    ) {
      return;
    }

    setIsDragging(false);
    onChangeTimes((prev) => {
      const firstStartTime = prev[0].ranges[0];
      const updatedTimes = updateTimes(
        prev,
        draggingEndHour,
        firstStartTime,
        draggingRangeStatus
      );

      return mergeOverlappingRanges(updatedTimes, draggingStartHour);
    });
    setDraggingStartHour(null);
    setDraggingEndHour(null);
    setDraggingRangeStatus('today');
  }, [
    draggingEndHour,
    removeHour,
    onChangeTimes,
    draggingRangeStatus,
    draggingStartHour,
  ]);

  const handleDelete = () => {
    if (removeHour === null) return;

    if (removeHour >= 0) {
      const filteredTimes = times.filter((_, i) => i !== removeHour);
      onChangeTimes(
        filteredTimes.length === 0 ? getDefaultTimes() : filteredTimes
      );
      setRemoveHour(null);
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
                  draggingRangeStatus === 'error'
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

/** 시간대 배열을 업데이트하는 함수 */
function updateTimeRangesArray(startHour: number, endHour: number) {
  const result = [startHour];

  if (startHour === endHour) {
    return [startHour]; // 값이 같으면 그대로 반환
  }

  // 순환적으로 숫자 추가
  let currentValue = startHour;
  while (currentValue !== endHour) {
    currentValue = (currentValue + 1) % 24; // 23 다음에 0으로 순환
    result.push(currentValue);
  }

  return result;
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

  return updateTimeRangesArray(
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
    const draggingIndexes = updateTimeRangesArray(
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

function updateDragRangeStatus(
  startTime: number,
  focusingTime: number,
  firstStartTime: number
): DraggingRangeStatus {
  const isTomorrow = startTime - focusingTime > 0 ? true : false;

  if (isTomorrow) {
    return focusingTime >= firstStartTime ? 'error' : 'tomorrow';
  }

  return 'today';
}

/** 시간대 업데이트 함수 */
const updateTimes = (
  prev: Time[],
  draggingEndHour: number,
  earliestStartHour: number,
  draggingRangeStatus: DraggingRangeStatus
): Time[] => {
  return prev.map((time, i) => {
    if (i !== prev.length - 1) return time;

    const canMerge = draggingRangeStatus !== 'error';
    let endTime = canMerge ? draggingEndHour : earliestStartHour - 1;
    endTime = endTime < 0 ? 23 : endTime;

    return {
      ...time,
      endTime: compactTimeList[endTime],
      ranges: updateTimeRangesArray(time.ranges[0], endTime),
    };
  });
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
