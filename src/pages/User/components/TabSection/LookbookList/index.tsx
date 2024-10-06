import LookbookCard from './LookbookCard';

const LookbookList = () => {
  return (
    <ol>
      <LookbookCard type={'1'} title={'27°C 이상인 날이에요'} />
      <LookbookCard type={'2'} title={'23°C-28°C 가량의 날이에요'} />
      <LookbookCard type={'3'} title={'20°C-23°C 가량의 날이에요'} />
      <LookbookCard type={'4'} title={'17°C-20°C 가량의 날이에요'} />
      <LookbookCard type={'5'} title={'12°C-17°C 가량의 날이에요'} />
      <LookbookCard type={'6'} title={'9°C-12°C 가량의 날이에요'} />
      <LookbookCard type={'7'} title={'5°C-9°C 가량의 날이에요'} />
      <LookbookCard type={'8'} title={'5°C 미만인 날이에요'} />
    </ol>
  );
};

export default LookbookList;
