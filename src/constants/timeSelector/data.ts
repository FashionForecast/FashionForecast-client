export const TIME_LIST = Array.from({ length: 24 }, (_, i) => {
  const AMPM = i < 12 ? '오전' : '오후';
  let hour = i.toString().padStart(2, '0');

  if (i >= 13) hour = (i - 12).toString().padStart(2, '0');

  return `${AMPM} ${hour}시`;
});
