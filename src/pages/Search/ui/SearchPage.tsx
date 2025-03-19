import { useState } from 'react';

import { GeolocationButton, SearchRegionList } from '@/features/search';

import { HeadHelmet, IconButton, XCircleIcon } from '@/shared/ui';
import { SearchIcon } from '@/shared/ui/icon/SearchIcon';

import { SearchHeader } from './SearchHeader/SearchHeader';
import { S, C } from './SearchPage.style';

export const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const trimKeyword = keyword.trim();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordResetClick = () => {
    setKeyword('');
  };

  return (
    <>
      <HeadHelmet
        title='위치 설정'
        description='위치를 설정하여 추천 옷차림과 날씨를 확인해보세요.'
        urlPath='/search'
      />

      <S.SearchPageWrap>
        <SearchHeader />

        <S.InputWrap>
          <C.SearchInput
            value={keyword}
            onChange={handleKeywordChange}
            placeholder='다른 지역을 찾고 싶어요'
            leftIcon={<SearchIcon />}
            rightIcon={
              keyword ? (
                <IconButton onClick={handleKeywordResetClick} size='small'>
                  <XCircleIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
          />
        </S.InputWrap>

        {!trimKeyword && <GeolocationButton />}

        <SearchRegionList keyword={trimKeyword} />
      </S.SearchPageWrap>
    </>
  );
};
