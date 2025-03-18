import { Region } from '@/entities/region';

import { S } from './MatchedRegion.style';

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
    <S.MatchedRegionItem onClick={() => handleRegionClick({ region, nx, ny })}>
      <span>
        {parts.map((part, index) =>
          part === keyword ? (
            <S.MatchedText key={index}>{part}</S.MatchedText>
          ) : (
            part
          )
        )}
      </span>
    </S.MatchedRegionItem>
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
