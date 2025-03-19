import { Link } from 'react-router-dom';

import { Header, IconButton, ArrowIcon } from '@/shared/ui';

const LoginHeader = () => {
  return (
    <Header
      leftSlot={
        <Link to={'/'}>
          <IconButton>
            <ArrowIcon />
          </IconButton>
        </Link>
      }
      centerTitle='로그인'
    />
  );
};

export default LoginHeader;
