import { Link, useLocation } from 'react-router-dom';

import { SearchPageState } from '@/entities/search';

import { ArrowIcon, Header, IconButton } from '@/shared/ui';

export const SearchHeader = () => {
  const searchPageState: SearchPageState = useLocation().state;

  return (
    <Header
      position='fixed'
      leftSlot={
        <Link
          to={searchPageState?.mode === 'memberSetting' ? '/user?tab=set' : '/'}
        >
          <IconButton size='large'>
            <ArrowIcon />
          </IconButton>
        </Link>
      }
      centerTitle='지역 고르기'
    />
  );
};
