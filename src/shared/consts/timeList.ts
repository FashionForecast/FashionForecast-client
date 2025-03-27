/** "오전 01시", "오후 03시" 형식 */
export const paddedTimeList = Array.from({ length: 24 }, (_, i) => {
  const AMPM = i < 12 ? '오전' : '오후';
  let hour = i.toString().padStart(2, '0');

  if (i >= 13) hour = (i - 12).toString().padStart(2, '0');

  return `${AMPM} ${hour}시`;
});

/** "오전 1시", "오후 3시" 형식 */
export const compactTimeList = Array.from({ length: 24 }, (_, i) => {
  const AMPM = i < 12 ? '오전' : '오후';
  let hour = i;

  if (i >= 13) hour = i - 12;

  return `${AMPM} ${hour}시`;
});
