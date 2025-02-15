import { S } from './SearchHeader.style';
import { Link, useLocation } from 'react-router-dom';
import { CustomTextField } from '@/shared/ui';
import { GoBackButton } from '@/shared/ui';
import { Header } from '@/shared/ui';
import { XCircleIcon } from '@/shared/ui';
import { SearchLocationState } from '@/features/search';

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
  const { state }: SearchLocationState = useLocation();

  return (
    <Header color='white' position='fixed'>
      <Link to={state?.mode === 'set' ? '/user?tab=set' : '/'}>
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
            <XCircleIcon />
          </S.CancleButton>
        )}
      </S.InputWrapper>
    </Header>
  );
};

export default SearchHeader;
