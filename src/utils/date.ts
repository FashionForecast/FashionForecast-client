export function KSTDate() {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  );
}

export function dateToISO(date: Date) {
  const offset = 1000 * 60 * 60 * 9; // UTC + 9시간

  return new Date(date.getTime() + offset).toISOString();
}
