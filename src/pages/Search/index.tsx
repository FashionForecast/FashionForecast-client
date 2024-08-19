import ArrowIcon from '@/components/icon/Arrow';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import regions from '@/assets/region.json';
import RegionItem from './components/RegionItem';
import CancelIcon from '@/components/icon/Cancel';

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
    <div>
      <div>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowIcon />
        </IconButton>

        <div>
          <TextField variant='filled' value={keyword} onChange={handleChange} />
          {keyword && (
            <button type='button' onClick={handleKeywordResetClick}>
              <CancelIcon />
            </button>
          )}
        </div>
      </div>

      <ol>
        {matchItems.map((v) => (
          <RegionItem key={v.region} region={v.region} keyword={keyword} />
        ))}
      </ol>
    </div>
  );
};

export default Search;
