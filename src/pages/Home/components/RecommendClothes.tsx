import { getDefaultClothes } from '@/service/clothes';
import { WeatherResponse } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { C, S } from './RecommendClothes.style';
import { ClothesImageName, OutfitType } from '@/types/clothes';
import { Chip, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import clothesImage from '@/assets/clothesImage/clothesImage';

const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';
export type TempCondition = typeof COOL | typeof NORMAL | typeof WARM;

export type ClothesForWeather = Pick<
  WeatherResponse['data'],
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPcp' | 'maximumPop'
>;

type RecommendClothesProps = {
  weather: ClothesForWeather;
};

const RecommendClothes = ({ weather }: RecommendClothesProps) => {
  const [tempCondition, setTempCondition] = useState<TempCondition>(NORMAL);
  const currentRegion = useAppSelector((state) => state.currentRegion.value);
  const { data, isError } = useQuery({
    queryKey: ['clothes', tempCondition, currentRegion?.region],
    queryFn: () => getDefaultClothes({ ...weather, tempCondition }),
  });

  const handleTempConditionChange = (
    _e: React.MouseEvent<HTMLElement>,
    condition: TempCondition
  ) => {
    if (!condition) return;
    setTempCondition(condition);
  };

  if (isError) return <div>추천 옷 오류가 발생했습니다.</div>;
  return (
    <S.Section>
      {data?.data.map(({ names, outfitType }) => (
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

      <ToggleButtonGroup
        fullWidth
        exclusive
        value={tempCondition}
        onChange={handleTempConditionChange}
      >
        <C.ToggleButon
          value={COOL}
          disabled={weather.extremumTmp < 5 || weather.extremumTmp >= 28}
        >
          시원하게
        </C.ToggleButon>
        <C.ToggleButon value={NORMAL}>적당하게</C.ToggleButon>
        <C.ToggleButon value={WARM} disabled={weather.extremumTmp >= 28}>
          따뜻하게
        </C.ToggleButon>
      </ToggleButtonGroup>
    </S.Section>
  );
};

export default RecommendClothes;

const outFitName = {
  OUTER: '상의',
  TOP: '상의',
  LAYERED: '상의',
  BOTTOM: '하의',
  ETC: '꼭 챙기세요!',
  BASIC_UMBRELLA: '꼭 챙기세요!',
  FOLDING_UMBRELLA: '꼭 챙기세요!',
} as const;

function getClothesImage(outfitType: OutfitType, names: ClothesImageName[]) {
  let Image;

  /** 대표 이미지가 둘 이상 포함되어 있는 경우, 특정 옷의 이미지를 보여줌 */
  if (outFitName[outfitType] === '상의' && names.length === 2) {
    if (names.includes('민소매') && names.includes('반팔티')) {
      Image = clothesImage.민소매;
    }
  }

  if (outFitName[outfitType] === '하의') {
    if (names.length === 3) Image = clothesImage.바지;
    else if (names.length === 2) {
      if (names.includes('반바지') && names.includes('슬랙스')) {
        Image = clothesImage.바지;
      } else if (names.includes('면바지') && names.includes('청바지')) {
        Image = clothesImage.청바지;
      }
    }
  }

  if (outFitName[outfitType] === '꼭 챙기세요!' && names.length === 2) {
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
