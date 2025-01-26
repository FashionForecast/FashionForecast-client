import { TIME_LIST } from '@/constants/timeList';
import { S } from './TimePage.style';
import { useCallback, useEffect, useMemo, useState } from 'react';
import HourSections from './HourSections/HourSections';
import TimeRanges from './TimeRanges/TimeRanges';
import { theme } from '@/styles/theme';

export type Time = {
  startTime: string;
  endTime: string | null;
  indexes: number[];
  isTomorrow?: boolean;
};

export type DragRangeStatus = 'today' | 'tommorow' | 'error';

export const TIME_COLOR: Record<DragRangeStatus, string> = {
  today: theme.colors.blueGrey[600],
  tommorow: theme.colors.info.main,
  error: theme.colors.error.main,
};

const TimePage = () => {
  const [times, setTimes] = useState<Time[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [focusingTime, setFocusingTime] = useState<null | number>(null); // 포커스중인 시간의 인덱스
  const [isDragging, setIsDragging] = useState(false);
  const [timeToRemove, setTimeToRemove] = useState<null | number>(null);
  const [dragRangeStatus, setDragRangeStatus] =
    useState<DragRangeStatus>('today');
  const visibleTimeText = useMemo(() => findVisibleTimeText(times), [times]);
  const tomorrowTime = times.find((v) => v.isTomorrow);

  const handlePointerDown = (startIndex: number) => {
    setTimeToRemove(null);
    const removeTarget = times.findIndex((time) =>
      time.indexes.includes(startIndex)
    );

    if (removeTarget >= 0) {
      setTimeToRemove(removeTarget);
      return;
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

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerEnd);

    return () => {
      window.removeEventListener('pointerup', handlePointerEnd);
    };
  }, [handlePointerEnd]);

  return (
    <div>
      <S.Clock>
        <S.ClockFace width={'328'} height={'328'} viewBox='-164 -164 328 328'>
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
          <circle
            cx={'0'}
            cy={'0'}
            r={'144'}
            fill='none'
            stroke={theme.colors.blueGrey[400]}
            strokeWidth={20}
            pathLength={24}
            strokeDasharray={'0 1 0.05 0.95 0.05 0.95'}
          />

          <TimeRanges
            times={times}
            isDragging={isDragging}
            draggingStartTime={startTime}
            focussingTime={focusingTime}
            dragRangeStatus={dragRangeStatus}
          />

          <HourSections
            visibleTimeText={visibleTimeText}
            tomorrowTime={tomorrowTime}
            startTimeIndex={startTime}
            focusedTimeIndex={focusingTime}
            isDragging={isDragging}
            handlePointerMove={handlePointerMove}
            handlePointerDown={handlePointerDown}
            handleDelete={handleDelete}
          />
        </S.ClockFace>
      </S.Clock>
    </div>
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
const findVisibleTimeText = (times: Time[]): [number[], number[]] => {
  const allIndexes = new Set();
  const bothEnds: number[] = []; // 각 범위의 양 끝단

  times.forEach((time) => {
    bothEnds.push(time.indexes[0], time.indexes.at(-1) as number);
    time.indexes.forEach((index) => {
      allIndexes.add(index);
    });
  });

  // 3의 배수이면서 사용자가 선택하지 않은 시간대의 텍스트
  const alwaysVisible = Array.from({ length: 24 }, (_, i) => i).filter(
    (index) => index % 3 === 0 && !allIndexes.has(index)
  );

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
