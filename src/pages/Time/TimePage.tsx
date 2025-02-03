import { TIME_LIST } from '@/constants/timeList';
import { S, C } from './TimePage.style';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HourSections from './HourSections/HourSections';
import TimeRanges from './TimeRanges/TimeRanges';
import { theme } from '@/styles/theme';
import TimeDivider from './TimeDivider/TimeDivider';
import TimeHeader from './TimeHeader/TimeHeader';

export type Time = {
  startTime: string;
  endTime: string | null;
  indexes: number[];
  isTomorrow?: boolean;
  isDefault?: boolean;
};

export type DragRangeStatus = 'today' | 'tommorow' | 'error';

export const TIME_COLOR: Record<DragRangeStatus, string> = {
  today: theme.colors.blueGrey[600],
  tommorow: theme.colors.info.main,
  error: theme.colors.error.main,
};

type TimeSelectorDayButton = {
  type: DayButtonType;
  text: string;
  day: string;
}[];
export type DayButtonType = '오늘' | '내일' | '모레';

const TimePage = () => {
  const [times, setTimes] = useState<Time[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [focusingTime, setFocusingTime] = useState<null | number>(null); // 포커스중인 시간의 인덱스
  const [isDragging, setIsDragging] = useState(false);
  const [timeToRemove, setTimeToRemove] = useState<null | number>(null);
  const [day, setDay] = useState<DayButtonType>('오늘');
  const [dragRangeStatus, setDragRangeStatus] =
    useState<DragRangeStatus>('today');
  const isDefaultTime = times[0]?.isDefault ?? false;
  const visibleTimeText = useMemo(
    () => findVisibleTimeText(times, startTime, focusingTime, isDefaultTime),
    [focusingTime, startTime, times, isDefaultTime]
  );
  const tomorrowTime = times.find((v) => v.isTomorrow);
  const [shortDate, longDate] = getFormattedDate(2);
  const DAY_BUTTONS: TimeSelectorDayButton = [
    { type: '오늘', text: '오늘', day: '오늘' },
    { type: '내일', text: '내일', day: '내일' },
    { type: '모레', text: shortDate, day: longDate },
  ];
  const selectedTimeText = getSelectedTimeText(day, longDate, times);

  const handlePointerDown = (startIndex: number) => {
    setTimeToRemove(null);

    const hasRemoveTarget = () => {
      const target = times.findIndex((time) =>
        time.indexes.includes(startIndex)
      );

      if (target >= 0) {
        setTimeToRemove(target);
        return true;
      }
      return false;
    };

    if (!isDefaultTime && hasRemoveTarget()) {
      return;
    }

    if (isDefaultTime) {
      setTimes([]);
    }

    setIsDragging(true);
    setStartTime(startIndex);
    setFocusingTime(startIndex);
    setTimes((prev) => [
      ...prev,
      {
        startTime: TIME_LIST[startIndex],
        endTime: null,
        indexes: [startIndex],
      },
    ]);
  };

  const handlePointerMove = (pointerTime: number) => {
    if (!isDragging) return;

    setFocusingTime(pointerTime);
    setDragRangeStatus(
      updateDragRangeStatus(startTime, pointerTime, times[0].indexes[0])
    );
  };

  const handlePointerEnd = useCallback(() => {
    // 포커스중인 시간이 없거나 삭제 작업이 있으면 종료
    if (focusingTime === null || timeToRemove !== null) return;

    setIsDragging(false);
    setTimes((prev) => {
      const firstStartTime = prev[0].indexes[0];
      const updatedTimes = updateTimes(
        prev,
        focusingTime,
        firstStartTime,
        dragRangeStatus
      );

      return mergeOverlappingRanges(updatedTimes, startTime);
    });
    setFocusingTime(null);
    setDragRangeStatus('today');
  }, [focusingTime, timeToRemove, startTime, dragRangeStatus]);

  const handleDelete = () => {
    if (timeToRemove === null) return;

    if (timeToRemove >= 0) {
      setTimes((prev) => prev.filter((_, i) => i !== timeToRemove));
      setTimeToRemove(null);
      setFocusingTime(null);
    }
  };

  const handleDeleteButtonClick = () => {
    setTimes([]);
  };

  const handleDayButtonClick = (type: DayButtonType) => () => {
    setDay(type);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerEnd);

    return () => {
      window.removeEventListener('pointerup', handlePointerEnd);
    };
  }, [handlePointerEnd]);

  useEffect(() => {
    if (times.length >= 1) return;

    const now = new Date();
    const startHour = now.getHours();
    const endHour = (startHour + 8) % 24;
    const isTomorrow = endHour < startHour;
    const newTime = {
      startTime: TIME_LIST[startHour],
      endTime: TIME_LIST[endHour],
      indexes: Array.from({ length: 9 }, (_, i) => (startHour + i) % 24),
      isTomorrow,
      isDefault: true,
    };
    setTimes([newTime]);
  }, [times]);

  return (
    <>
      <TimeHeader />
      <div>
        <S.DayWrap>
          <S.Heading>날짜</S.Heading>
          <S.ButtonWrap>
            {DAY_BUTTONS.map((button) => (
              <C.DayButton
                key={button.type}
                $type={button.type}
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
              width={'328'}
              height={'328'}
              viewBox='-164 -164 328 328'
            >
              <circle
                cx={'0'}
                cy={'0'}
                r={'144'}
                fill='none'
                stroke={
                  dragRangeStatus === 'error'
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
                draggingStartTime={startTime}
                focussingTime={focusingTime}
                dragRangeStatus={dragRangeStatus}
                isDefaultTime={isDefaultTime}
              />

              <HourSections
                visibleTimeText={visibleTimeText}
                tomorrowTime={tomorrowTime}
                startTimeIndex={startTime}
                focusedTimeIndex={focusingTime}
                isDragging={isDragging}
                dragRangeStatus={dragRangeStatus}
                handlePointerMove={handlePointerMove}
                handlePointerDown={handlePointerDown}
                handleDelete={handleDelete}
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
                  <C.DeleteButton onClick={handleDeleteButtonClick}>
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
      </div>

      <C.SubmitButton disabled={isDefaultTime}>
        이 시간대에 맞는 옷차림 찾기
      </C.SubmitButton>
    </>
  );
};

export default TimePage;

/** 시간대 배열을 업데이트하는 함수 */
function updateTimeIndexArray(startIndex: number, endIndex: number) {
  const result = [startIndex];

  if (startIndex === endIndex) {
    return [startIndex]; // 값이 같으면 그대로 반환
  }

  // 순환적으로 숫자 추가
  let currentValue = startIndex;
  while (currentValue !== endIndex) {
    currentValue = (currentValue + 1) % 24; // 23 다음에 0으로 순환
    result.push(currentValue);
  }

  return result;
}

/** 겹치는 시간대 병합 함수 */
function mergeOverlappingRanges(times: Time[], startIndex: number) {
  const list = [...times];

  let i = 0;
  while (i < list.length) {
    let hasMerged = false; // 현재 인덱스에서 병합이 발생했는지 추적

    for (let j = i + 1; j < list.length; j++) {
      // 겹치는 `indexes`가 있는지 확인
      if (hasOverlap(list[i].indexes, list[j].indexes)) {
        // 병합된 indexes 계산
        const mergedIndexes = mergeIndexes(
          list[i].indexes,
          list[j].indexes,
          startIndex
        );

        // 병합 데이터 업데이트
        list[i] = {
          startTime: TIME_LIST[mergedIndexes[0]],
          endTime: TIME_LIST[mergedIndexes.at(-1)!],
          indexes: mergedIndexes,
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
  const sorted = list.sort((a, b) => a.indexes[0] - b.indexes[0]);
  const lastIndexes = sorted.at(-1)?.indexes;

  // 마지막 시간대가 내일 여부 판별
  if (
    startIndex !== 0 &&
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

/** 두 `indexes` 배열을 병합하고 필요한 시간 계산 */
function mergeIndexes(
  indexes1: number[],
  indexes2: number[],
  startIndex: number
) {
  const combined = [...new Set([...indexes1, ...indexes2])].sort(
    (a, b) => a - b
  );

  // 자정(23->0) 간 시간 병합 처리
  const isTomorrow =
    startIndex !== 0 && combined.includes(0) && combined.includes(23);
  const endIndex = combined.findIndex((value) => value === startIndex);

  return updateTimeIndexArray(
    isTomorrow ? startIndex : combined[0],
    isTomorrow ? endIndex - 1 : combined.at(-1)!
  );
}

// 시간 텍스트의 visible 범위 계산
const findVisibleTimeText = (
  times: Time[],
  start: number,
  focusing: number | null,
  isDefaultTime: boolean
): [number[], number[]] => {
  const allIndexes = new Set();
  const bothEnds: number[] = []; // 각 범위의 양 끝단

  if (typeof focusing === 'number') {
    const draggingIndexes = updateTimeIndexArray(start, focusing);

    draggingIndexes.forEach((index) => {
      allIndexes.add(index);
    });
  }

  if (!isDefaultTime) {
    times.forEach((time) => {
      bothEnds.push(time.indexes[0], time.indexes.at(-1) as number);
      time.indexes.forEach((index) => {
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
) {
  const isTomorrow = startTime - focusingTime > 0 ? true : false;

  if (isTomorrow) {
    return focusingTime >= firstStartTime ? 'error' : 'tommorow';
  }

  return 'today';
}

/** 시간대 업데이트 함수 */
const updateTimes = (
  prev: Time[],
  focusingTime: number,
  firstStartTime: number,
  dragRangeStatus: string
): Time[] => {
  return prev.map((time, i) => {
    if (i !== prev.length - 1) return time;

    const canMerge = dragRangeStatus !== 'error';
    let endTime = canMerge ? focusingTime : firstStartTime - 1;
    endTime = endTime < 0 ? 23 : endTime;

    return {
      ...time,
      endTime: TIME_LIST[endTime],
      indexes: updateTimeIndexArray(time.indexes[0], endTime),
    };
  });
};

const getFormattedDate = (daysToAdd: number) => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysToAdd);

  const isSameMonth = today.getMonth() === futureDate.getMonth();
  const day = futureDate.getDate();
  const month = futureDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.

  const shortDate = isSameMonth ? `${day}일` : `${month}/${day}일`;
  const longDate = `${month}월 ${day}일`;

  return [shortDate, longDate];
};

// 선택된 시간대 텍스트 생성
function getSelectedTimeText(
  day: DayButtonType,
  longDate: string,
  times: Time[]
) {
  if (times.length === 0 || !times[0].endTime) return '';

  const dayText = day === '모레' ? longDate : day;

  const formatTimeZone = (startTime: string, endTime: string | null) => {
    if (endTime === null) return '';
    return `${startTime} - ${endTime.slice(3)}`;
  };

  const formattedTimes = times.map(({ startTime, endTime }) =>
    formatTimeZone(startTime, endTime)
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

  return `${dayText} ${timeText}`;
}
