import ArrowIcon from '@/components/icon/Arrow';
import { Toolbar } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import CancelIcon from '@/components/icon/Cancel';
import * as S from './style';

const Search = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState(location.state.region || '');
  const navigate = useNavigate();
  const matchItems = keyword
    ? regions.filter((v) => v.region.includes(keyword))
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordResetClick = () => {
    setKeyword('');
  };

  return (
    <>
      <S.Header color='inherit' elevation={0}>
        <Toolbar>
          <S.GoBackButton onClick={() => navigate(-1)} size='large'>
            <ArrowIcon />
          </S.GoBackButton>

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
          <RegionItem key={item.region} keyword={keyword} {...item} />
        ))}
      </S.RegionList>
    </>
  );
};

export default Search;
