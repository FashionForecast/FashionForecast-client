import { Link, useLocation } from 'react-router-dom';

import { SearchLocationState } from '@/features/search';

import { GoBackButton, Header } from '@/shared/ui';

export const SearchHeader = () => {
  const { state }: SearchLocationState = useLocation();

  return (
    <Header
      position='fixed'
      leftSlot={
        <Link to={state?.mode === 'set' ? '/user?tab=set' : '/'}>
          <GoBackButton />
        </Link>
      }
      centerTitle='지역 고르기'
    />
  );
};
