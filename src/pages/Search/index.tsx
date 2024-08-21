import ArrowIcon from '@/components/icon/Arrow';
import { Button, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import CancelIcon from '@/components/icon/Cancel';
import * as S from './style';
import { Region } from '@/types/region';
import { MY_REGIONS } from '@/constants/localStorage/key';

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
    ? regions.filter((v) => v.region.includes(keyword))
    : [];

  const setNewMyRegions = (newRegions: Region[]) => {
    setMyRegions(newRegions);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <S.Header color='inherit' elevation={0}>
        <Toolbar>
          <Link to={'/'}>
            <S.GoBackButton size='large'>
              <ArrowIcon />
            </S.GoBackButton>
          </Link>

          <S.InputWrapper>
            <S.Input
              variant='filled'
              value={keyword}
              onChange={handleChange}
              fullWidth
              size='small'
            />
            {keyword && (
              <S.CancleButton type='button' onClick={handleKeywordResetClick}>
                <CancelIcon />
              </S.CancleButton>
            )}
          </S.InputWrapper>
        </Toolbar>
      </S.Header>

      <S.RegionList>
        {matchItems.map((item) => (
          <RegionItem
            key={item.region}
            keyword={keyword}
            myRegions={myRegions}
            setNewMyRegions={setNewMyRegions}
            {...item}
          />
        ))}
      </S.RegionList>

      {matchItems.length === 1 && isSaved && (
        <div>
          <Button
            variant='outlined'
            color='error'
            size='large'
            onClick={handleDeleteRegionClick}
          >
            이 위치 삭제하기
          </Button>
        </div>
      )}
    </>
  );
};

export default Search;
