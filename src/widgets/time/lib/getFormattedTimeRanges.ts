import { Day, Time } from '../model/types';

type getFormattedTimeRangesParams = {
  times: Time[] | [];
  day: Day;
  isCompact?: boolean;
};

/**
 * 선택된 시간 범위를 포맷하는 함수
 * @returns `isCompact: true && times.length >= 3` ['오늘', '오전 5시 - 7시', '···', '오후 10시 - 다음날 오전 1시']
 * @returns `isCompact: false` ['오늘', '오전 5시 - 7시', 오전 12시 - 오후 1시, '오후 10시 - 다음날 오전 1시']
 *  */
export function getFormattedTimeRanges({
  times,
  day,
  isCompact,
}: getFormattedTimeRangesParams) {
  if (!times[0]?.endTime) return [];

  const formattedTimes = times.map(({ startTime, endTime, isNextDay }) => {
    if (!endTime) return '';

    const isSameAMPM = startTime.slice(0, 2) === endTime.slice(0, 2);
    const nextDay = isNextDay ? '다음날' : '';
    const endHour = endTime.slice(isSameAMPM ? 3 : 0);

    return `${startTime} - ${nextDay} ${endHour}`;
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
