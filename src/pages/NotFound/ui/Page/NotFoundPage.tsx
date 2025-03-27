import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Button, HeadHelmet } from '@/shared/ui';

export const NotFoundPage = () => {
  return (
    <>
      <HeadHelmet
        title='페이지를 찾을 수 없습니다'
        description='페이지를 찾을 수 없습니다.'
      />

      <NotFoundWrap>
        <span>페이지를 찾을 수 없습니다.</span>
        <Link to={'/'}>
          <Button fullWidth>홈으로 가기</Button>
        </Link>
      </NotFoundWrap>
    </>
  );
};

const NotFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;

  & span {
    margin-bottom: 8px;
  }
`;
