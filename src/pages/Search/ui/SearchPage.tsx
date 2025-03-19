import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { GeolocationButton, SearchRegionList } from '@/features/search';

import { HeadHelmet, IconButton, XCircleIcon } from '@/shared/ui';
import { SearchIcon } from '@/shared/ui/icon/SearchIcon';

import { SearchHeader } from './SearchHeader/SearchHeader';
import { S, C } from './SearchPage.style';

export const SearchPage = () => {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputResetClick = () => {
    setInput('');
    setKeyword('');
  };

  const debouncedKeyword = useMemo(
    () =>
      debounce((input: string) => {
        setKeyword(input.trim());
      }, 300),
    []
  );

  /** input이 변경될 때 debouncedKeyword 실행 */
  useEffect(() => {
    debouncedKeyword(input);
  }, [input, debouncedKeyword]);

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
            value={input}
            onChange={handleInputChange}
            placeholder='다른 지역을 찾고 싶어요'
            leftIcon={<SearchIcon />}
            rightIcon={
              input ? (
                <IconButton onClick={handleInputResetClick} size='small'>
                  <XCircleIcon />
                </IconButton>
              ) : (
                <></>
              )
            }
          />
        </S.InputWrap>

        {!keyword && <GeolocationButton />}

        <SearchRegionList keyword={keyword} />
      </S.SearchPageWrap>
    </>
  );
};
