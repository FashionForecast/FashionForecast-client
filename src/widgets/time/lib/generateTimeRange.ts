/** 주어진 시작 시간과 끝 시간 사이의 모든 시간을 포함하는 배열을 생성 */
export function generateTimeRange(startHour: number, endHour: number) {
  const ranges = [startHour];

  for (let hour = startHour; hour !== endHour; ) {
    hour = (hour + 1) % 24;
    ranges.push(hour);
  }

  return ranges;
}
