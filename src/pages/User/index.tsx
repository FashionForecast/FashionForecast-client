import UserHeader from './components/UserHeader';
import { S } from './style';
import TabSection from './components/TabSection';

const User = () => {
  return (
    <S.UserWrap>
      <UserHeader />

      <S.Heading>안녕하세요 사용자님,</S.Heading>

      <TabSection />
    </S.UserWrap>
  );
};

export default User;
