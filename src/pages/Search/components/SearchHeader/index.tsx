import { S } from './style';
import { Link } from 'react-router-dom';
import CancelIcon from '@/assets/svg/cancle.svg?react';
import CustomTextField from '@/components/CustomMui/CustomTextField';
import GoBackButton from '@/components/GoBackButton';
import Header from '@/components/Header';

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
    <Header color='white' position='fixed'>
      <Link to={'/'}>
        <GoBackButton />
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
    </Header>
  );
};

export default SearchHeader;
