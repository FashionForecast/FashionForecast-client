import { DraggingRangeStatus, Time } from '../../../model/types';

import { HourHand } from './HourHand/HourHand';
import { TimeRange } from './TimeRange/TimeRange';

type TimeRangesProps = {
  times: Time[];
  isDragging: boolean;
  draggingStartHour: number | null;
  draggingEndHour: number | null;
  draggingRangeStatus: DraggingRangeStatus;
};

export const TimeRanges = ({
  times,
  isDragging,
  draggingStartHour,
  draggingEndHour,
  draggingRangeStatus,
}: TimeRangesProps) => {
  const isDefaultTime = times[0].isDefault;
  const isDraggingRange =
    isDragging && draggingStartHour !== null && draggingEndHour !== null;

  return (
    <>
      {!isDefaultTime && <HourHand />}

      {!isDefaultTime &&
        times.map(
          (time, i) =>
            time.endTime && (
              <TimeRange
                key={i}
                startHour={time.ranges[0]}
                endHour={time.ranges[time.ranges.length - 1]}
              />
            )
        )}

      {isDefaultTime && (
        <>
          <TimeRange
            startHour={times[0].ranges[0]}
            endHour={times[0].ranges[times[0].ranges.length - 1]}
            isDefaultTime={isDefaultTime}
          />
          <HourHand />
        </>
      )}

      {/* 드래그 중인 TimeRange */}
      {isDraggingRange && (
        <TimeRange
          startHour={draggingStartHour}
          endHour={draggingEndHour}
          draggingRangeStatus={draggingRangeStatus}
        />
      )}
    </>
  );
};
