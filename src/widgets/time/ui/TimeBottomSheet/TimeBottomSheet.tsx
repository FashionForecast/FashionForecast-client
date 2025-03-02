import { useState } from 'react';

import { Button } from '@/shared/ui';

import { DayButtonType, Time } from '../../model/types';

import { S } from './TimeBottomSheet.style';

type TimeBottomSheetProps = {
  day: DayButtonType;
  times: Time[];
  onTimeSelectorToggle: () => void;
};

export const TimeBottomSheet = ({
  day,
  times,
  onTimeSelectorToggle,
}: TimeBottomSheetProps) => {
  const [isCompactRanges, setIsCompactRanges] = useState(true);

  const formattedRanges = getFormattedTimeRanges({
    day,
    times,
    isCompact: isCompactRanges,
  });

  const handleCompactRangesToggle = () => {
    setIsCompactRanges((prev) => !prev);
  };

  const hasComma = (index: number) => {
    return (
      !isCompactRanges && index >= 1 && index <= formattedRanges.length - 2
    );
  };

  return (
    <>
      <S.BottomSheet onClick={handleCompactRangesToggle}>
        <S.RangesWrap $isCompactRanges={isCompactRanges}>
          {formattedRanges.map((range, index) => (
            <S.TimeText key={range} $isCompactRanges={isCompactRanges}>
              {range}
              {hasComma(index) && ','}
            </S.TimeText>
          ))}
        </S.RangesWrap>

        <Button
          onClick={onTimeSelectorToggle}
          size='large'
          variant='outlined'
          fullWidth
        >
          외출시간 변경하기
        </Button>
      </S.BottomSheet>
      <S.Backdrop
        $isBackdropOpen={!isCompactRanges}
        onClick={handleCompactRangesToggle}
      />
    </>
  );
};

type getFormattedTimeRangesParams = {
  day: DayButtonType;
  times: Time[] | [];
  isCompact: boolean;
};

/**
 * 선택된 시간 범위를 포맷하는 함수
 * @returns `isCompact: true && times.length >= 3` ['오늘', '오전 5시 - 7시', '···', '오후 10시 - 다음날 오전 1시']
 * @returns `isCompact: false` ['오늘', '오전 5시 - 7시', 오전 12시 - 오후 1시, '오후 10시 - 다음날 오전 1시']
 *  */
function getFormattedTimeRanges({
  day,
  times,
  isCompact,
}: getFormattedTimeRangesParams) {
  if (!times[0]?.endTime) return [];

  const formattedTimes = times.map(({ startTime, endTime, isTomorrow }) => {
    if (!endTime) return '';

    const isSameAMPM = startTime.slice(0, 2) === endTime.slice(0, 2);
    const tomorrowText = isTomorrow ? '다음날' : '';
    const endText = endTime.slice(isSameAMPM ? 3 : 0);

    return `${startTime} - ${tomorrowText} ${endText}`;
  });

  if (isCompact && times.length >= 3) {
    return [
      day,
      formattedTimes[0],
      '···',
      formattedTimes[formattedTimes.length - 1],
    ];
  }

  return [day, ...formattedTimes];
}
