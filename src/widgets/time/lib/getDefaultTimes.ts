import { compactTimeList } from '@/shared/consts/timeList';

import { Time } from '../model/types';

/** 현재 시간으로부터 +8 시간을 기본 시간대로 지정 */
export function getDefaultTimes(): Time[] {
  const currentHour = new Date().getHours();
  const endHour = (currentHour + 8) % 24;
  const isTomorrow = currentHour > endHour;

  return [
    {
      startTime: compactTimeList[currentHour],
      endTime: compactTimeList[endHour],
      indexes: Array.from({ length: 9 }, (_, i) => (currentHour + i) % 24),
      isTomorrow,
      isDefault: true,
    },
  ];
}
