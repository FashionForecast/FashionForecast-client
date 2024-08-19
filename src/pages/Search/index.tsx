import ArrowIcon from '@/components/icon/Arrow';
import { Toolbar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import CancelIcon from '@/components/icon/Cancel';
import * as S from './style';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const matchItems = regions.filter((v) => v.region.includes(keyword));

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

      <ol>
        {matchItems.map((item) => (
          <RegionItem key={item.region} keyword={keyword} {...item} />
        ))}
      </ol>
    </>
  );
};

export default Search;
