import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LookbookCreateHeader from './components/LookbookCreateHeader';
import { S } from './style';

const UserLookbookCreate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // type이 1 ~ 8 아닌 경우, /user 페이지로 이동
  useEffect(() => {
    const typeNumber = Number(searchParams.get('type'));

    if (!Number.isInteger(typeNumber) || typeNumber <= 0 || typeNumber >= 9) {
      navigate('/user');
    }
  }, []);

  return (
    <S.PageWrap>
      <LookbookCreateHeader />
    </S.PageWrap>
  );
};

export default UserLookbookCreate;
