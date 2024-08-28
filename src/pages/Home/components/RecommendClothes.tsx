import { getDefaultClothes } from '@/service/clothes';
import { WeatherResponse } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { C, S } from './RecommendClothes.style';
import clothesImage from '@/assets/clothesImage/반팔티.svg';
import { OutfitType } from '@/types/clothes';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

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
  const { data, isError } = useQuery({
    queryKey: ['clothes', tempCondition],
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
        <C.ClothesCard elevation={0} key={outfitType}>
          <S.Image src={clothesImage} alt={outFitName[outfitType]} />
          <div>
            <h4>{outFitName[outfitType]}</h4>
            {names.map((name) => (
              <C.Chip key={name} label={name} size='small' />
            ))}
          </div>
        </C.ClothesCard>
      ))}
      <ToggleButtonGroup
        fullWidth
        exclusive
        value={tempCondition}
        onChange={handleTempConditionChange}
      >
        <ToggleButton value={COOL} disabled={weather.extremumTmp < 5}>
          시원하게
        </ToggleButton>
        <ToggleButton value={NORMAL}>적당하게</ToggleButton>
        <ToggleButton value={WARM} disabled={weather.extremumTmp >= 28}>
          따듯하게
        </ToggleButton>
      </ToggleButtonGroup>
    </S.Section>
  );
};

export default RecommendClothes;

const outFitName: Record<OutfitType, string> = {
  OUTER: '외투',
  TOP: '상의',
  BOTTOM: '하의',
  ETC: '기타 악세사리',
  BASIC_UMBRELLA: '장우산',
  FOLDING_UMBRELLA: '접이식 우산',
  LAYERED: '겉옷',
};
