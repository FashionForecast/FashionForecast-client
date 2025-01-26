import { Time, DragRangeStatus } from '../TimePage';
import TimeRange from './TimeRange/TimeRange';

type TimeRangesProps = {
  times: Time[];
  isDragging: boolean;
  draggingStartTime: number;
  focussingTime: number | null;
  dragRangeStatus: DragRangeStatus;
};

const TimeRanges = ({
  times,
  isDragging,
  draggingStartTime,
  focussingTime,
  dragRangeStatus,
}: TimeRangesProps) => {
  return (
    <>
      {times.map(
        (time, i) =>
          time.endTime && (
            <TimeRange
              key={i}
              startTime={time.indexes[0]}
              endTime={time.indexes[time.indexes.length - 1]}
            />
          )
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
