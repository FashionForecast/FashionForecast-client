import { C, S } from './style';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/assets/svg/arrow.svg?react';
import CancelIcon from '@/assets/svg/cancle.svg?react';
import CustomPaper from '@/components/CustomMui/CustomPaper';
import CustomToolbar from '@/components/CustomMui/CustomToolbar';
import CustomTextField from '@/components/CustomMui/CustomTextField';

type SearchHeaderProps = {
  keyword: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeywordResetClick: () => void;
};

const SearchHeader = ({
  keyword,
  onInputChange,
  onKeywordResetClick,
}: SearchHeaderProps) => {
  return (
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
              onChange={onInputChange}
              fullWidth
              size='small'
            />
            {keyword && (
              <S.CancleButton type='button' onClick={onKeywordResetClick}>
                <CancelIcon />
              </S.CancleButton>
            )}
          </S.InputWrapper>
        </CustomToolbar>
      </CustomPaper>
    </C.AppBar>
  );
};

export default SearchHeader;
