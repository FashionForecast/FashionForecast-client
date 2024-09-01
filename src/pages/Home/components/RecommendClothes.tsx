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
          <S.ImageWrap>{getClothesImage(names)}</S.ImageWrap>
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
        <C.ToggleButon value={COOL} disabled={weather.extremumTmp < 5}>
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

const outFitName: Record<OutfitType, string> = {
  OUTER: '상의',
  TOP: '상의',
  LAYERED: '상의',
  BOTTOM: '하의',
  ETC: '꼭 챙기세요!',
  BASIC_UMBRELLA: '꼭 챙기세요!',
  FOLDING_UMBRELLA: '꼭 챙기세요!',
};

function getClothesImage(names: ClothesImageName[] | string[]) {
  let Image;

  for (const name of names) {
    if (name === '민소매') Image = clothesImage.민소매;
    else if (name === '반팔티') Image = clothesImage.반팔티;
    else if (name === '긴팔티') Image = clothesImage.긴팔티;
    else if (name === '후드티') Image = clothesImage.후드티;
    else if (name === '니트') Image = clothesImage.니트;
    else if (name === '트렌치 코트') Image = clothesImage['트렌치 코트'];
    else if (name === '코트') Image = clothesImage.코트;
    else if (name === '패딩') Image = clothesImage.패딩;
    else if (name === '반바지') Image = clothesImage.반바지;
    else if (name === '슬랙스' || name === '면바지' || name === '기모 바지')
      Image = clothesImage.바지;
    else if (name === '청바지') Image = clothesImage.청바지;
    else if (name === '겉옷') Image = clothesImage.반팔티;
    else if (name === '접이식 우산') Image = clothesImage['접이식 우산'];
    else if (name === '장우산') Image = clothesImage.장우산;
    else if (name === '히트텍') Image = clothesImage.장우산;
    else if (name === '목도리') Image = clothesImage.목도리;
  }

  return Image ? <Image /> : <img src='not' alt='.' />;
}
