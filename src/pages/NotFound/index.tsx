import CustomButton from '@/components/CustomMui/CustomButton';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <NotFoundWrap>
      <span>페이지를 찾을 수 없습니다.</span>
      <Link to={'/'}>
        <CustomButton fullWidth>홈으로 가기</CustomButton>
      </Link>
    </NotFoundWrap>
  );
};

export default NotFound;

const NotFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  & span {
    margin-bottom: 8px;
  }
`;
