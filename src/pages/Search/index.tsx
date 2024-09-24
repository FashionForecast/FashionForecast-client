import { useState } from 'react';
import regions from '@/assets/region.json';
import RegionItem from './components/Index/RegionItem';
import { C, S } from './style';
import SearchHeader from './components/SearchHeader';
import RecentSearchList from './components/RecentSearchList';
import CurrentRegionButton from './components/CurrentRegionButton';

const Search = () => {
  const [keyword, setKeyword] = useState('');

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

      <CurrentRegionButton />

      {!keyword && <RecentSearchList regions={regions} />}

      <C.RegionList>
        {matchItems.map((item) => (
          <RegionItem key={item.region} keyword={keyword} {...item} />
        ))}
      </C.RegionList>
    </S.SearchWrapper>
  );
};

export default Search;
