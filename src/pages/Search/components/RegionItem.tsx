import CheckIcon from '@/components/icon/Check';
import * as S from './RegionItem.style';
import { IconButton } from '@mui/material';
import { MY_REGIONS } from '@/constants/localStorage/key';

type RegionItemProps = {
  region: string;
  keyword: string;
  nx: number;
  ny: number;
};

//TODO: alert 제거
const RegionItem = ({ region, keyword, nx, ny }: RegionItemProps) => {
  const [before, match, after] = splitText(region, keyword);
  const handleSaveClick = () => {
    const saved: Omit<RegionItemProps, 'keyword'>[] = JSON.parse(
      localStorage.getItem(MY_REGIONS) ?? '[]'
    );

    if (saved.some((item) => item.region === region)) {
      alert('해당 지역이 이미 저장되어 있습니다.');
      return;
    }

    if (saved.length >= 3) {
      alert('3개 이상 저장할 수 없습니다.');
      return;
    }

    localStorage.setItem(
      MY_REGIONS,
      JSON.stringify([...saved, { region, nx, ny }])
    );
    alert(`${region} 지역을 저장했습니다.`);
  };

  return (
    <S.Item divider onClick={handleSaveClick}>
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
