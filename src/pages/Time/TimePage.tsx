import { TIME_LIST } from '@/constants/timeList';
import { S } from './TimePage.style';
import { useCallback, useEffect, useState } from 'react';
import SelectedRange from './SelectedRange/SelectedRange';
import ClockSegment from './Segment';

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
  const centerX = 0; // 시계 중심 X 좌표
  const centerY = 0; // 시계 중심 Y 좌표
  const radius = 120; // 시계 반지름

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
      <ClockSegment startHour={5} endHour={9} />

      <S.Clock>
        <S.ClockFace width={'328'} height={'328'} viewBox='-164 -164 328 328'>
          <circle
            cx={'0'}
            cy={'0'}
            r={'144'}
            fill='transparent'
            stroke='black'
            strokeWidth={4}
            pathLength={8}
            strokeDasharray={'0.7 0.3'}
            strokeDashoffset={0.85}
          />
          <circle
            cx={'0'}
            cy={'0'}
            r={'144'}
            fill='transparent'
            stroke='red'
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
              stroke='rgba(5, 88, 83, 0.6)'
              strokeWidth={40}
              strokeLinecap='round'
            />
          )}

          {TIME_LIST.map((time, i) => {
            const [AMPM, hour] = time.split(' ');
            const angle = -90 + i * 15; // 각도 계산
            const x =
              centerX + (radius + 26) * Math.cos((angle * Math.PI) / 180); // 숫자는 원 바깥쪽에
            const y =
              centerY + (radius + 26) * Math.sin((angle * Math.PI) / 180);

            return (
              <S.HourText
                key={time}
                x={x}
                y={y}
                textAnchor='middle'
                fill='#333'
                onPointerDown={() => handlePointerDown(i)}
                onPointerMove={() => handlePointerMove(i)}
                onClick={handleDelete}
              >
                <tspan x={x} dy={-2}>
                  {AMPM}
                </tspan>
                <tspan x={x} dy={12}>
                  {hour}
                </tspan>
              </S.HourText>
            );
          })}
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

/**
 * 두 배열에서 겹치는 요소가 있는지 확인
 * @param {number[]} arr1 - 첫 번째 배열
 * @param {number[]} arr2 - 두 번째 배열
 * @returns {boolean} - 겹치는 요소가 있으면 true, 없으면 false
 */
function hasOverlap(arr1: number[], arr2: number[]) {
  return arr1.some((item) => arr2.includes(item));
}

/**
 * 두 `indexes` 배열을 병합하고 필요한 시간 계산
 * @param {number[]} indexes1 - 첫 번째 indexes 배열
 * @param {number[]} indexes2 - 두 번째 indexes 배열
 * @param {number} startIndex - 시작 인덱스
 * @returns {number[]} - 병합된 indexes 배열
 */
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
