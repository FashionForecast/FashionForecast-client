import {
  ClothesImageName,
  ClothesResponseData,
  OutfitType,
} from '@/types/clothes';
import { C, S } from './style';
import clothesImage from '@/constants/imageData/clothesImage';
import { Chip } from '@mui/material';
import { memo } from 'react';

type RecommendClothesProps = {
  clothes: ClothesResponseData;
};

const RecommendClothes = ({ clothes }: RecommendClothesProps) => {
  return (
    <S.RecommendWrap>
      {clothes?.map(({ names, outfitType }) => (
        <C.ClothesCard elevation={0} key={outfitType} $outfitType={outfitType}>
          <S.ImageWrap>
            {getClothesImage(outfitType, names as ClothesImageName[])}
          </S.ImageWrap>
          <div>
            <h4>{outFitName[outfitType]}</h4>
            <S.ChipWrapper>
              {names.map((name) => (
                <Chip key={name} label={name} size='small' />
              ))}
            </S.ChipWrapper>
          </div>
        </C.ClothesCard>
      ))}
    </S.RecommendWrap>
  );
};

export default memo(RecommendClothes);

const outFitName: Record<OutfitType, string> = {
  TOP: '상의',
  BOTTOM: '하의',
  ETC: '꼭 챙기세요!',
} as const;

function getClothesImage(outfitType: OutfitType, names: ClothesImageName[]) {
  let Image;

  /** 대표 이미지가 둘 이상 포함되어 있는 경우, 특정 옷의 이미지를 보여줌 */
  if (outfitType === 'TOP' && names.length === 2) {
    if (names.includes('민소매') && names.includes('반팔티')) {
      Image = clothesImage.민소매;
    }
  }

  if (outfitType === 'BOTTOM') {
    if (names.length === 3) Image = clothesImage.바지;
    else if (names.length === 2) {
      if (names.includes('반바지') && names.includes('슬랙스')) {
        Image = clothesImage.바지;
      } else if (names.includes('면바지') && names.includes('청바지')) {
        Image = clothesImage.청바지;
      }
    }
  }

  if (outfitType === 'ETC' && names.length === 2) {
    if (names.includes('접이식 우산')) {
      Image = clothesImage.겉옷접이식우산;
    } else if (names.includes('장우산')) {
      Image = clothesImage.겉옷장우산;
    }
  }

  /** 위의 조건에서 찾지 못했을 때, 대표 이미지를 찾음 */
  for (const name of names) {
    if (Image) break;

    if (name === '슬랙스' || name === '면바지' || name === '기모 바지') {
      Image = clothesImage.바지;
    } else {
      Image = clothesImage[name];
    }
  }

  return Image ? <Image /> : <img src='not' alt='.' />;
}
