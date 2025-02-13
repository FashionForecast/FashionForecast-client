import UserHeader from '../../UserHeader/UserHeader';
import { S } from './UserPage.style';
import TabSection from '../../TabSection/TabSection';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import HeadHelmet from '@/components/HeadHelmet/HeadHelmet';

export const UserPage = () => {
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
