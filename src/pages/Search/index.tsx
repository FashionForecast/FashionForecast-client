import { Button } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import { C, S } from './style';
import { Region } from '@/types/region';
import { MY_REGIONS } from '@/constants/localStorage/key';
import TrashCan from '@/components/icon/TrashCan';

import SearchHeader from './components/SearchHeader';

type SearchLocationState = {
  state?: {
    region: string;
  };
};

const Search = () => {
  const { state }: SearchLocationState = useLocation();
  const [keyword, setKeyword] = useState(state?.region || '');
  const [myRegions, setMyRegions] = useState<Region[]>(
    JSON.parse(localStorage.getItem(MY_REGIONS) || '[]')
  );

  const isSaved = myRegions.some(
    (v) => keyword !== '' && v.region.includes(keyword)
  );
  const matchItems = keyword
    ? regions.filter((v) =>
        v.region.split(' ').some((v) => v.startsWith(keyword))
      )
    : [];

  const setNewMyRegions = (newRegions: Region[]) => {
    setMyRegions(newRegions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordResetClick = () => {
    setKeyword('');
  };

  const handleDeleteRegionClick = () => {
    setMyRegions((prev) => {
      const filtered = prev.filter((v) => v.region !== matchItems[0].region);
      localStorage.setItem(MY_REGIONS, JSON.stringify(filtered));

      return filtered;
    });
  };

  return (
    <>
      <SearchHeader
        keyword={keyword}
        onInputChange={handleInputChange}
        onKeywordResetClick={handleKeywordResetClick}
      />

      <C.RegionList>
        {matchItems.map((item) => (
          <RegionItem
            key={item.region}
            keyword={keyword}
            myRegions={myRegions}
            setNewMyRegions={setNewMyRegions}
            {...item}
          />
        ))}
      </C.RegionList>

      {matchItems.length === 1 && isSaved && (
        <S.Aside>
          <Button
            variant='outlined'
            color='error'
            size='large'
            onClick={handleDeleteRegionClick}
            fullWidth
          >
            <TrashCan /> 이 위치 삭제하기
          </Button>
        </S.Aside>
      )}
    </>
  );
};

export default Search;
