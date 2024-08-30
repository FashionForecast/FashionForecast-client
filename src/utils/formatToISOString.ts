function formatToISOString(day?: string, time: string = '00:00'): string {
  const currentDate = new Date();
  const date =
    day === '내일'
      ? new Date(currentDate.setDate(currentDate.getDate() + 1))
      : new Date();

  const [period, hourStr] = time.split(' ');
  const hour = parseInt(hourStr.replace('시', ''), 10);
  const isPM = period === '오후';
  const hoursIn24Format = isPM ? (hour % 12) + 12 : hour % 12;

  // 날짜와 시간을 설정
  date.setHours(hoursIn24Format);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return utcDate.toISOString().slice(0, -5);
}
export default formatToISOString;
