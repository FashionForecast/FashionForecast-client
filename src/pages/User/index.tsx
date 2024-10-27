import UserHeader from './components/UserHeader';
import { S } from './style';
import TabSection from './components/TabSection';
import useAppSelector from '@/hooks/useAppSelector';

const User = () => {
  const user = useAppSelector((state) => state.user.info);

  return (
    <S.UserWrap>
      <UserHeader />

      <S.Heading>안녕하세요 {user?.nickname}님,</S.Heading>

      <TabSection />
    </S.UserWrap>
  );
};

export default User;
