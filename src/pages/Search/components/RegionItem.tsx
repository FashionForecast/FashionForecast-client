import CheckIcon from '@/components/icon/Check';
import * as S from './RegionItem.style';
import { IconButton } from '@mui/material';

type RegionItemProps = {
  region: string;
  keyword: string;
};

const RegionItem = ({ region, keyword }: RegionItemProps) => {
  const [before, match, after] = splitText(region, keyword);

  return (
    <S.Item divider>
      <span>
        {before}
        <strong>{match}</strong>
        {after}
      </span>

      <IconButton>
        <CheckIcon />
      </IconButton>
    </S.Item>
  );
};

export default RegionItem;

function splitText(region: string, keyword: string) {
  const index = region.indexOf(keyword);

  const before = region.slice(0, index);
  const after = region.slice(index + keyword.length);

  return [before, keyword, after];
}
