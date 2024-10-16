import BottomList from './BottomList';
import { S } from './style';
import TopList from './TopList';

const Showcase = () => {
  return (
    <S.ShowcaseWrap>
      <S.TopWrap>
        <TopList />
      </S.TopWrap>

      <BottomList />
    </S.ShowcaseWrap>
  );
};

export default Showcase;
