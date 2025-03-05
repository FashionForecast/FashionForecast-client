import { DragRangeStatus, Time } from '../../../model/types';
import { TimeDivider } from '../TimeDivider/TimeDivider';

import { TimeRange } from './TimeRange/TimeRange';

type TimeRangesProps = {
  times: Time[];
  isDragging: boolean;
  draggingStartTime: number;
  focussingTime: number | null;
  dragRangeStatus: DragRangeStatus;
  isDefaultTime?: boolean;
};

export const TimeRanges = ({
  times,
  isDragging,
  draggingStartTime,
  focussingTime,
  dragRangeStatus,
  isDefaultTime,
}: TimeRangesProps) => {
  return (
    <>
      {!isDefaultTime &&
        times.map(
          (time, i) =>
            time.endTime && (
              <TimeRange
                key={i}
                startTime={time.ranges[0]}
                endTime={time.ranges[time.ranges.length - 1]}
              />
            )
        )}

      {isDefaultTime && (
        <>
          <TimeRange
            startTime={times[0].ranges[0]}
            endTime={times[0].ranges[times[0].ranges.length - 1]}
            isDefaultTime={isDefaultTime}
          />
          <TimeDivider />
        </>
      )}

      {/* 드래그 중인 TimeRange */}
      {isDragging && focussingTime !== null && (
        <TimeRange
          startTime={draggingStartTime}
          endTime={focussingTime}
          dragRangeStatus={dragRangeStatus}
        />
      )}
    </>
  );
};
