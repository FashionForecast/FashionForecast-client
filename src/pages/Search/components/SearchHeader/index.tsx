import CustomPaper from '@/components/CustomMui/CustomPaper';
import { C, S } from './style';
import CustomToolbar from '@/components/CustomMui/CustomToolBar';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/components/icon/Arrow';
import CustomTextField from '@/components/CustomMui/CustomTextField';
import CancelIcon from '@/components/icon/Cancel';

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
