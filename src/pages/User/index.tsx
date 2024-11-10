import UserHeader from './components/UserHeader';
import { S } from './style';
import TabSection from './components/TabSection';
import useAppSelector from '@/hooks/useAppSelector';
import HeadHelmet from '@/components/HeadHelmet';

const User = () => {
  const user = useAppSelector((state) => state.user.info);

  return (
    <>
      <HeadHelmet
        title='마이페이지'
        description='나만의 룩북 및 옵션을 설정할 수 있어요.'
        urlPath='/user'
      />

      <S.UserWrap>
        <UserHeader />

        <S.Heading>안녕하세요 {user?.nickname}님,</S.Heading>

        <TabSection />
      </S.UserWrap>
    </>
  );
};

export default User;
