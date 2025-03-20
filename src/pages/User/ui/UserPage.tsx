import { Link } from 'react-router-dom';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { ArrowIcon, Header, HeadHelmet, IconButton } from '@/shared/ui';

import TabSection from './TabSection/TabSection';
import { S } from './UserPage.style';

export const UserPage = () => {
  const user = useAppSelector((state) => state.member.info);

  return (
    <>
      <HeadHelmet
        title='마이페이지'
        description='나만의 룩북 및 옵션을 설정할 수 있어요.'
        urlPath='/user'
      />

      <S.UserWrap>
        <Header
          leftSlot={
            <Link to={'/'}>
              <IconButton>
                <ArrowIcon />
              </IconButton>
            </Link>
          }
          centerTitle='내 정보'
        />

        <S.Heading>안녕하세요 {user?.nickname}님,</S.Heading>

        <TabSection />
      </S.UserWrap>
    </>
  );
};
