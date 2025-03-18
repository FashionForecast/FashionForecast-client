import { Link, useLocation } from 'react-router-dom';

import { SearchPageState } from '@/features/search';

import { GoBackButton, Header } from '@/shared/ui';

export const SearchHeader = () => {
  const searchPageState: SearchPageState = useLocation().state;

  return (
    <Header
      position='fixed'
      leftSlot={
        <Link
          to={searchPageState?.mode === 'memberSetting' ? '/user?tab=set' : '/'}
        >
          <GoBackButton />
        </Link>
      }
      centerTitle='지역 고르기'
    />
  );
};
