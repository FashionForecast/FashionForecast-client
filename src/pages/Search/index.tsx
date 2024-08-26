import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import { C, S } from './style';

import SearchHeader from './components/SearchHeader';
import LocationIcon from '@/components/icon/Location';
import CustomButton from '@/components/CustomButton';
import RecentSearchList from './components/RecentSearch';

type SearchLocationState = {
  state?: {
    region: string;
  };
};

const Search = () => {
  const { state }: SearchLocationState = useLocation();
  const [keyword, setKeyword] = useState(state?.region || '');

  const matchItems = keyword
    ? regions.filter((v) =>
        v.region.split(' ').some((v) => v.startsWith(keyword))
      )
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordResetClick = () => {
    setKeyword('');
  };

  return (
    <S.SearchWrapper>
      <SearchHeader
        keyword={keyword}
        onInputChange={handleInputChange}
        onKeywordResetClick={handleKeywordResetClick}
      />

      <S.regionSetButtonWrapper>
        <CustomButton
          variant='outlined'
          color='inherit'
          size='large'
          fullWidth
          startIcon={<LocationIcon />}
        >
          현재 위치로 설정하기
        </CustomButton>
      </S.regionSetButtonWrapper>

      {!keyword && <RecentSearchList />}

      <C.RegionList>
        {matchItems.map((item) => (
          <RegionItem key={item.region} keyword={keyword} {...item} />
        ))}
      </C.RegionList>
    </S.SearchWrapper>
  );
};

export default Search;
