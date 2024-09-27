import GoBackButton from '@/components/GoBackButton';
import { S } from './style';
import { Link } from 'react-router-dom';

const Feedback = () => {
  return (
    <div>
      <S.Header>
        <Link to={'/'}>
          <GoBackButton />
        </Link>
        <h6>고객의 소리</h6>
      </S.Header>
    </div>
  );
};

export default Feedback;
