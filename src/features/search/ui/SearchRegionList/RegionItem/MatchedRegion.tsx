import { IconButton } from '@mui/material';

import { Region } from '@/entities/region';

import { CheckIcon } from '@/shared/ui';

import { C } from './MatchedRegion.style';

type MatchedRegionProps = Region & {
  keyword: string;
  handleRegionClick: (regionData: Region) => void;
};

export const MatchedRegion = ({
  region,
  keyword,
  nx,
  ny,
  handleRegionClick,
}: MatchedRegionProps) => {
  const parts = splitText(region, keyword);

  return (
    <C.Item divider onClick={() => handleRegionClick({ region, nx, ny })}>
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
