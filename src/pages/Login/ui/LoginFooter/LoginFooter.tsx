import { Link } from 'react-router-dom';

import { Button } from '@/shared/ui';

import { S } from './LoginFooter.style';

const LoginFooter = () => {
  return (
    <S.Footer>
      <Link to={'/terms-of-service'}>
        <Button color='inherit'>이용약관</Button>
      </Link>
      <S.Divider />
      <Link to={'/privacy-policy'}>
        <Button color='inherit'>개인정보처리방침</Button>
      </Link>
    </S.Footer>
  );
};

export default LoginFooter;
