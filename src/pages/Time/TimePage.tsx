import { TIME_LIST } from '@/constants/timeList';
import { S } from './TimePage.style';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SelectedRange from './SelectedRange/SelectedRange';
import HourSections from './HourSections/HourSections';

export type Time = {
  startTime: string;
  endTime: string | null;
  indexes: number[];
};

const TimePage = () => {
  const [times, setTimes] = useState<Time[]>([]);
  const [startTimeIndex, setStartTimeIndex] = useState<number>(0);
  const [timeRange, setTimeRange] = useState(0);
  const [focusedTimeIndex, setFocusedTimeInex] = useState<null | number>(0); // 포커스중인 시간의 인덱스
  const [isDragging, setIsDragging] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<null | number>(null);
  const timeRangeDegree = calcTimeRangeDegree(startTimeIndex); // TimeRange 각도
  const visibleTimeText = useMemo(() => findVisibleTimeText(times), [times]);

  const handlePointerDown = (startIndex: number) => {
    setDeleteIndex(null);
    const matchingIndex = times.findIndex((time) =>
      time.indexes.includes(startIndex)
    );

    if (matchingIndex >= 0) {
      setDeleteIndex(matchingIndex);
      return;
    }

    setIsDragging(true);
    setStartTimeIndex(startIndex);
    setFocusedTimeInex(startIndex);
    setTimeRange(0);
    setTimes((prev) => [
      ...prev,
      {
        startTime: TIME_LIST[startIndex],
        endTime: null,
        indexes: [startIndex],
      },
    ]);
  };
  const handlePointerMove = (currentTimeIndex: number) => {
    if (!isDragging) return;

    setFocusedTimeInex(currentTimeIndex);
    setTimeRange(calcTimeRange(startTimeIndex, currentTimeIndex));
  };

  const handlePointerEnd = useCallback(() => {
    setIsDragging(false);

    // 유효한 focusedTimeIndex가 있고, 삭제 작업이 없을 경우에만 실행
    if (typeof focusedTimeIndex === 'number' && deleteIndex === null) {
      // 상태 업데이트를 병합하여 중복된 setTimes 호출 제거
      setTimes((prev) => {
        const updatedTimes = prev.map((time, i) => {
          if (i === prev.length - 1) {
            return {
              ...time,
              endTime: TIME_LIST[focusedTimeIndex],
              indexes: updateTimeIndexArray(time.indexes[0], focusedTimeIndex),
            };
          }
          return time;
        });

        // 병합된 결과를 반환
        return mergeOverlappingRanges(updatedTimes, startTimeIndex);
      });
    }

    setFocusedTimeInex(null);
  }, [deleteIndex, focusedTimeIndex, startTimeIndex]);

  const handleDelete = () => {
    if (deleteIndex === null) return;

    if (deleteIndex >= 0) {
      setTimes((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
      setFocusedTimeInex(null);
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
            stroke='#CED5DF'
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
            stroke='#95A7BA'
            strokeWidth={20}
            pathLength={24}
            strokeDasharray={'0 1 0.05 0.95 0.05 0.95'}
          />

          {times.map(
            (time, i) => time.endTime && <SelectedRange key={i} time={time} />
          )}

          {isDragging && (
            <S.TimeRange
              $degree={timeRangeDegree}
              $range={timeRange}
              cx={'0'}
              cy={'0'}
              r={'144'}
              fill='transparent'
              stroke='rgba(149, 167, 186, 0.6)'
              strokeWidth={40}
              strokeLinecap='round'
            />
          )}

          <HourSections
            visibleTimeText={visibleTimeText}
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

export function calcTimeRange(startIndex: number, endIndex: number) {
  const diff = startIndex - endIndex;
  let range;

  if (diff === 0) range = 0.1;
  else if (diff > 0) {
    range = (TIME_LIST.length - diff) * 4.15;
  } else range = Math.abs(diff) * 4.15;

  return range;
}

export function calcTimeRangeDegree(startIndex: number) {
  return -90 + startIndex * 15;
}

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

function mergeOverlappingRanges(times: Time[], startIndex: number) {
  const list = [...times]; // 원본 데이터 복사

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

  return list;
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
