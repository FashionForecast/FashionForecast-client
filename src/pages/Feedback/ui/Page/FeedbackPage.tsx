import { Link } from 'react-router-dom';

import { Feedback } from '@/features/feedback';

import { GoBackButton, Header, HeadHelmet } from '@/shared/ui';

import { S } from './FeedbackPage.style';

export const FeedbackPage = () => {
  return (
    <>
      <HeadHelmet
        title='고객의 소리'
        description='서비스에 대한 소중한 피드백을 남겨주세요.'
        urlPath='/feedback'
      />

      <S.FeedbackWrap>
        <Header
          leftSlot={
            <Link to={'/user?tab=set'}>
              <GoBackButton />
            </Link>
          }
          centerTitle='고객의 소리'
        />

        <Feedback />
      </S.FeedbackWrap>
    </>
  );
};
