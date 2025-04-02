import { Link } from 'react-router-dom';

import { MemberInformationBar } from '@/features/member';

import { ArrowIcon, Header, HeadHelmet, IconButton } from '@/shared/ui';

import { TabSection } from './TabSection/TabSection';
import { S } from './UserPage.style';

export const UserPage = () => {
  return (
    <>
      <HeadHelmet
        title='마이페이지'
        description='나만의 룩북 및 옵션을 설정할 수 있어요.'
        urlPath='/user'
      />

      <S.UserPageWrap>
        <Header
          leftSlot={
            <Link to={'/'}>
              <IconButton size='large'>
                <ArrowIcon />
              </IconButton>
            </Link>
          }
          centerTitle='내 정보'
        />

        <MemberInformationBar />
        <S.DivideLine />

        <TabSection />
      </S.UserPageWrap>
    </>
  );
};
