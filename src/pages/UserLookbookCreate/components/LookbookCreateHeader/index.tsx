import GoBackButton from '@/components/GoBackButton';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import { C, S } from './style';

const LookbookCreateHeader = () => {
  return (
    <Header>
      <Link to={'/'}>
        <GoBackButton />
      </Link>

      <S.TitleWrap>
        <h6>룩북 만들기</h6>
      </S.TitleWrap>

      <C.Button color='inherit'>저장</C.Button>
    </Header>
  );
};

export default LookbookCreateHeader;
