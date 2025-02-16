import styled from '@emotion/styled';

import { CustomButton } from '../CustomMui/CustomButton';

type ErrorProps = {
  handleRefetch: () => void;
};

export const FetchError = ({ handleRefetch }: ErrorProps) => {
  return (
    <ErrorWrap>
      <p>요청사항을 처리하는데 실패했습니다.</p>
      <CustomButton variant='contained' color='primary' onClick={handleRefetch}>
        다시 시도
      </CustomButton>
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
