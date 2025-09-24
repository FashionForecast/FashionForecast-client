import { DraggingRangeStatus } from '@/widgets/time/model/types';

import { Time } from '@/entities/time';

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
      {!isDefaultTime && (
        <>
          <HourHand />
          {times.map(
            (time) =>
              time.endTime && (
                <TimeRange
                  key={time.startTime}
                  startHour={time.ranges[0]}
                  endHour={time.ranges[time.ranges.length - 1]}
                />
              )
          )}
        </>
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
