import GoBackButton from '@/components/GoBackButton/GoBackButton';
import { Link } from 'react-router-dom';
import { S } from './TimeHeader.style';
import Header from '@/components/Header/Header';

const TimeHeader = () => {
  return (
    <Header>
      <Link to='/'>
        <GoBackButton />
      </Link>
      <S.Title>외출시간 고르기</S.Title>
    </Header>
  );
};

export default TimeHeader;
