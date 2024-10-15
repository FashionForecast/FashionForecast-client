import { Navigate, useSearchParams } from 'react-router-dom';
import LookbookCreateHeader from './components/LookbookCreateHeader';
import { S } from './style';
import TypeHeadline from './components/TypeHeadline';
import { WeatherType } from '@/types/weather';

const UserLookbookCreate = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');

  if (isInvalidParam(typeParam)) return <Navigate to={'/user'} />;
  return (
    <S.PageWrap>
      <LookbookCreateHeader />
      <TypeHeadline type={typeParam as WeatherType} />
    </S.PageWrap>
  );
};

export default UserLookbookCreate;

// type이 1~8 사이가 아니면, 유효하지 않은 parameter
function isInvalidParam(typeParam: string | null) {
  const typeNumber = Number(typeParam);

  return (
    !typeParam ||
    !Number.isInteger(typeNumber) ||
    typeNumber <= 0 ||
    typeNumber >= 9
  );
}
