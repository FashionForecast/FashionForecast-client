import { Link } from 'react-router-dom';

import { CustomButton } from '@/shared/ui';

import { S } from './LoginFooter.style';

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
