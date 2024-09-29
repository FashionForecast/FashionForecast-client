import CustomButton from '../CustomMui/CustomButton';
import styled from '@emotion/styled';

type ErrorProps = {
  handleRefetch: () => void;
};

const NetworkError = ({ handleRefetch }: ErrorProps) => {
  return (
    <NetworkErrorWrap>
      <p>요청사항을 처리하는데 실패했습니다.</p>
      <CustomButton variant='contained' color='primary' onClick={handleRefetch}>
        다시 시도
      </CustomButton>
    </NetworkErrorWrap>
  );
};

export default NetworkError;

const NetworkErrorWrap = styled.div`
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
