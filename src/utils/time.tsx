const getCurrentKST = () => {
  const offset = 1000 * 60 * 60 * 9;
  const KST = new Date(new Date().getTime() + offset);

  KST.setMinutes(0);
  KST.setSeconds(0);

  const KSTnow = KST.toISOString().slice(0, -5);

  return KSTnow;
};
export default getCurrentKST;
