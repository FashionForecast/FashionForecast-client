import UserHeader from './components/UserHeader';
import { S } from './style';

const User = () => {
  return (
    <S.UserWrap>
      <UserHeader />

      <S.Heading>안녕하세요 사용자님,</S.Heading>
    </S.UserWrap>
  );
};

export default User;
