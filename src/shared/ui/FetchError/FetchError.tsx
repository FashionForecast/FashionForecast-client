import styled from '@emotion/styled';

import { Button } from '../Button/Button';

export const FetchError = () => {
  return (
    <ErrorWrap>
      <p>요청사항을 처리하는데 실패했습니다.</p>
      <Button
        variant='contained'
        color='primary'
        onClick={() => window.location.reload()}
      >
        다시 시도
      </Button>
    </ErrorWrap>
  );
};

const ErrorWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin: 16px;

  & p {
    ${({ theme }) => theme.typo['subtitle-2']}
    margin-bottom: 8px;
  }
`;
