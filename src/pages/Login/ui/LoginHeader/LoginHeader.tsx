import { Link } from 'react-router-dom';

import { Header, IconButton, ArrowIcon } from '@/shared/ui';

export const LoginHeader = () => {
  return (
    <Header
      leftSlot={
        <Link to={'/'}>
          <IconButton size='large'>
            <ArrowIcon />
          </IconButton>
        </Link>
      }
      centerTitle='로그인'
    />
  );
};
