import CheckIcon from '@/components/icon/Check';
import { C } from './RegionItem.style';
import { IconButton } from '@mui/material';
import { MY_REGIONS } from '@/constants/localStorage/key';
import { Region } from '@/types/region';

type RegionItemProps = Region & {
  keyword: string;
  myRegions: Region[];
  setNewMyRegions: (newRegions: Region[]) => void;
};

//TODO: alert 제거
const RegionItem = ({
  region,
  keyword,
  nx,
  ny,
  myRegions,
  setNewMyRegions,
}: RegionItemProps) => {
  const [before, match, after] = splitText(region, keyword);
  const handleSaveClick = () => {
    if (myRegions.some((item) => item.region === region)) {
      alert('해당 지역이 이미 저장되어 있습니다.');
      return;
    }

    if (myRegions.length >= 3) {
      alert('3개 이상 저장할 수 없습니다.');
      return;
    }

    const addRegion = [...myRegions, { region, nx, ny }];
    setNewMyRegions(addRegion);
    localStorage.setItem(MY_REGIONS, JSON.stringify(addRegion));
    alert(`${region} 지역을 저장했습니다.`);
  };

  return (
    <C.Item divider onClick={handleSaveClick}>
      <span>
        {before}
        <strong>{match}</strong>
        {after}
      </span>

      <IconButton>
        <CheckIcon />
      </IconButton>
    </C.Item>
  );
};

export default RegionItem;

function splitText(region: string, keyword: string) {
  const index = region.indexOf(keyword);

  const before = region.slice(0, index);
  const after = region.slice(index + keyword.length);

  return [before, keyword, after];
}
