import { GoBackButton } from '@/shared/ui';
import { S } from './FeedbackPage.style';
import { Link } from 'react-router-dom';

import { HeadHelmet } from '@/shared/ui';
import { Feedback } from '@/features/feedback';

export const FeedbackPage = () => {
  return (
    <>
      <HeadHelmet
        title='고객의 소리'
        description='서비스에 대한 소중한 피드백을 남겨주세요.'
        urlPath='/feedback'
      />

      <S.FeedbackWrap>
        <S.Header>
          <Link to={'/user?tab=set'}>
            <GoBackButton />
          </Link>
          <h6>고객의 소리</h6>
        </S.Header>

        <Feedback />
      </S.FeedbackWrap>
    </>
  );
};
