import { useState } from 'react';

import { Button } from '@/shared/ui';

import { getFormattedTimeRanges } from '../../lib/getFormattedTimeRanges';
import { Day, Time } from '../../model/types';

import { S } from './TimeBottomSheet.style';

type TimeBottomSheetProps = {
  day: Day;
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

  const handleTimeSelectorToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onTimeSelectorToggle();
  };

  const hasComma = (index: number) => {
    const isMiddleIndex = index >= 1 && index <= formattedRanges.length - 2;

    if (!isCompactRanges) return isMiddleIndex;
    return isMiddleIndex && formattedRanges.length === 3;
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
          onClick={handleTimeSelectorToggle}
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
