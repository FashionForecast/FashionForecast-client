import { Region } from '@/entities/region';

import { S } from './MatchedRegion.style';

type MatchedRegionProps = Region & {
  keywordParts: string[];
  handleRegionClick: (regionData: Region) => void;
};

export const MatchedRegion = ({
  region,
  nx,
  ny,
  keywordParts,
  handleRegionClick,
}: MatchedRegionProps) => {
  const parts = splitRegionByKeywords(region, keywordParts);

  return (
    <S.MatchedRegionItem onClick={() => handleRegionClick({ region, nx, ny })}>
      <span>
        {parts.map((part, index) =>
          keywordParts.includes(part) ? (
            <S.MatchedText key={index}>{part}</S.MatchedText>
          ) : (
            part
          )
        )}
      </span>
    </S.MatchedRegionItem>
  );
};

/** 지역 이름을 키워드로 분할하여, 하이라이트 부분과 일반 부분으로 나눠 반환 */
function splitRegionByKeywords(regionName: string, keywordParts: string[]) {
  // keywordParts = ['종로']이면, regex = /(종로)/g
  // keywordParts = ['서울', '종로']이면, regex = /(서울|종로)/g
  const regex = new RegExp(`(${keywordParts.join('|')})`, 'g');

  return regionName.split(regex).filter(Boolean);
}
