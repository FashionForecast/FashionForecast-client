import CheckIcon from '@/components/icon/Check';
import { C } from './RegionItem.style';
import { IconButton } from '@mui/material';
import { Region } from '@/types/region';
import useAppDispatch from '@/hooks/useAppDispatch';
import { currentRegionActions } from '@/redux/slice/currentRegionSlice';
import { useNavigate } from 'react-router-dom';
import { MY_REGION } from '@/constants/localStorage/key';

type RegionItemProps = Region & {
  keyword: string;
};

const RegionItem = ({ region, keyword, nx, ny }: RegionItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const parts = splitText(region, keyword);
  const handleClick = () => {
    const regionData = { region, nx, ny };
    dispatch(currentRegionActions.setCurrentRegion(regionData));
    localStorage.setItem(MY_REGION, JSON.stringify(regionData));
    navigate('/');
  };

  return (
    <C.Item divider onClick={handleClick}>
      <span>
        {parts.map((part, index) =>
          part === keyword ? <strong key={index}>{part}</strong> : part
        )}
      </span>

      <IconButton>
        <CheckIcon />
      </IconButton>
    </C.Item>
  );
};

export default RegionItem;

function splitText(region: string, keyword: string) {
  const parts = [];
  let currentIndex = 0;

  while (currentIndex < region.length) {
    const index = region.indexOf(keyword, currentIndex);
    let isFirstPartOfWord = false;

    if (index === 0 || region[index - 1] === ' ') isFirstPartOfWord = true;

    if (index === -1) {
      parts.push(region.slice(currentIndex));
      break;
    }

    if (index !== currentIndex) {
      const indexEnd = isFirstPartOfWord ? index : index + 1;
      parts.push(region.slice(currentIndex, indexEnd));
    }

    if (isFirstPartOfWord) {
      parts.push(keyword);
    }

    currentIndex = index + keyword.length;
  }

  return parts;
}
