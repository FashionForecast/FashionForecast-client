import ArrowIcon from '@/components/icon/Arrow';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import CancelIcon from '@/components/icon/Cancel';
import { C, S } from './style';
import { Region } from '@/types/region';
import { MY_REGIONS } from '@/constants/localStorage/key';
import TrashCan from '@/components/icon/TrashCan';
import CustomToolbar from '@/components/CustomToolBar';
import CustomTextField from '@/components/CustomTextField';
import CustomPaper from '@/components/CustomPaper';

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
      <C.AppBar>
        <CustomPaper>
          <CustomToolbar>
            <Link to={'/'}>
              <C.GoBackButton size='large'>
                <ArrowIcon />
              </C.GoBackButton>
            </Link>

            <S.InputWrapper>
              <CustomTextField
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
          </CustomToolbar>
        </CustomPaper>
      </C.AppBar>

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
