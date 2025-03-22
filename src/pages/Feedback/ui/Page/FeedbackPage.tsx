import { Link } from 'react-router-dom';

import { Feedback } from '@/features/feedback';

import { ArrowIcon, Header, HeadHelmet, IconButton } from '@/shared/ui';

import { S } from './FeedbackPage.style';

export const FeedbackPage = () => {
  return (
    <>
      <HeadHelmet
        title='고객의 소리'
        description='서비스에 대한 소중한 피드백을 남겨주세요.'
        urlPath='/feedback'
      />

      <S.FeedbackPageWrap>
        <Header
          leftSlot={
            <Link to={'/'}>
              <IconButton>
                <ArrowIcon />
              </IconButton>
            </Link>
          }
          centerTitle='고객의 소리'
        />

        <Feedback />
      </S.FeedbackPageWrap>
    </>
  );
};
