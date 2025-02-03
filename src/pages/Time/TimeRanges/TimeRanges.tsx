import { Time, DragRangeStatus } from '../TimePage';
import TimeRange from './TimeRange/TimeRange';
import TimeDivider from '../TimeDivider/TimeDivider';

type TimeRangesProps = {
  times: Time[];
  isDragging: boolean;
  draggingStartTime: number;
  focussingTime: number | null;
  dragRangeStatus: DragRangeStatus;
  isDefaultTime?: boolean;
};

const TimeRanges = ({
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
                startTime={time.indexes[0]}
                endTime={time.indexes[time.indexes.length - 1]}
              />
            )
        )}

      {isDefaultTime && (
        <>
          <TimeRange
            startTime={times[0].indexes[0]}
            endTime={times[0].indexes[times[0].indexes.length - 1]}
            dragRangeStatus={dragRangeStatus}
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

export default TimeRanges;
