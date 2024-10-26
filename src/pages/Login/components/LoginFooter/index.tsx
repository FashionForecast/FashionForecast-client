import CustomButton from '@/components/CustomMui/CustomButton';
import { S } from './style';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <S.Footer>
      <Link to={'/terms-of-service'}>
        <CustomButton color='inherit'>이용약관</CustomButton>
      </Link>
      <S.Divider />
      <Link to={'/privacy-policy'}>
        <CustomButton color='inherit'>개인정보처리방침</CustomButton>
      </Link>
    </S.Footer>
  );
};

export default LoginFooter;
