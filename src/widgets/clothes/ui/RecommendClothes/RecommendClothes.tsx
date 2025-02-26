import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import { ClothesIconNames } from '@/entities/clothes';
import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';
import {
  TemperatureCondition,
  WEATHER_COLORS,
  WeatherType,
  WeatherTypeName,
} from '@/entities/weather';

import { clothesIconNameList } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib';
import { theme } from '@/shared/styles';
import { Chip } from '@/shared/ui';

import { getRecommendClothes } from '../../api/recommend';
import { OutfitType, WeatherForRecommendClothes } from '../../model/types';

import { S } from './RecommendClothes.style';
import { RecommendClothesLoading } from './RecommendClothesLoading';

type RecommendClothesProps = {
  weather: WeatherForRecommendClothes;
  weatherName: WeatherTypeName;
  weatherType: WeatherType;
  temperatureCondition: TemperatureCondition;
};

export const RecommendClothes = memo(
  ({
    weather,
    weatherName,
    weatherType,
    temperatureCondition,
  }: RecommendClothesProps) => {
    const geolocation = useAppSelector((state) => state.geolocation.value);

    const { data: recommendClothes, isLoading } = useQuery({
      queryKey: ['clothes', temperatureCondition, geolocation?.region, weather],
      queryFn: () => getRecommendClothes(weather, temperatureCondition),
    });

    if (isLoading) return <RecommendClothesLoading />;
    return (
      <S.RecommendWrap>
        {recommendClothes?.map(({ names, outfitType }) => (
          <S.ClothesCard key={outfitType}>
            <S.CardContent>
              <S.ImageWrap>
                <ClothesIcon
                  color={CLOTHES_COLOR[outfitType](weatherName)}
                  name={getClothesName(
                    outfitType,
                    names as ClothesIconNames[],
                    weatherType
                  )}
                />
              </S.ImageWrap>

              <div>
                <h4>{outfitTitle[outfitType]}</h4>
                <S.ChipWrapper>
                  {names.map((name) => (
                    <Chip
                      key={name}
                      label={name}
                      color={CHIP_COLOR[outfitType](weatherName)}
                    />
                  ))}
                </S.ChipWrapper>
              </div>
            </S.CardContent>
          </S.ClothesCard>
        ))}
      </S.RecommendWrap>
    );
  }
);

const ETC_CHIP_COLORS: Record<WeatherTypeName, string> = {
  sweltering: theme.colors.lime[100],
  hot: theme.colors.lightGreen[100],
  warm: theme.colors.cyan[100],
  moderate: theme.colors.lightBlue[100],
  cool: theme.colors.indigo[100],
  chilly: theme.colors.yellow[100],
  cold: theme.colors.red[100],
  frigid: theme.colors.orange[100],
};

const CHIP_COLOR: Record<OutfitType, (weatherName: WeatherTypeName) => string> =
  {
    TOP: (weatherName) => WEATHER_COLORS[weatherName],
    BOTTOM: () => theme.colors.blueGrey[100],
    ETC: (weatherName) => ETC_CHIP_COLORS[weatherName],
  };

const TOP_CLOTHES_COLORS: Record<WeatherTypeName, string> = {
  sweltering: theme.colors.red[300],
  hot: theme.colors.orange[300],
  warm: theme.colors.yellow[300],
  moderate: theme.colors.lime[300],
  cool: theme.colors.green[300],
  chilly: theme.colors.cyan[300],
  cold: theme.colors.blue[300],
  frigid: theme.colors.deepPurple[300],
};

const ETC_CLOTHES_COLOR: Record<WeatherTypeName, string> = {
  sweltering: theme.colors.lime[200],
  hot: theme.colors.lightGreen[300],
  warm: theme.colors.cyan[300],
  moderate: theme.colors.lightBlue[300],
  cool: theme.colors.indigo[300],
  chilly: theme.colors.yellow[200],
  cold: theme.colors.red[300],
  frigid: theme.colors.orange[300],
};

const CLOTHES_COLOR: Record<
  OutfitType,
  (weatherName: WeatherTypeName) => string
> = {
  TOP: (weatherName) => TOP_CLOTHES_COLORS[weatherName],
  BOTTOM: () => theme.colors.blueGrey[500],
  ETC: (weatherName) => ETC_CLOTHES_COLOR[weatherName],
};

const outfitTitle: Record<OutfitType, string> = {
  TOP: '상의',
  BOTTOM: '하의',
  ETC: '꼭 챙기세요!',
} as const;

const ThumbNailClothesList: Record<
  WeatherType,
  Record<Exclude<OutfitType, 'ETC'>, ClothesIconNames>
> = {
  '1': {
    TOP: '민소매',
    BOTTOM: '반바지',
  },
  '2': {
    TOP: '반팔티',
    BOTTOM: '슬랙스',
  },
  '3': {
    TOP: '긴팔티',
    BOTTOM: '면바지',
  },
  '4': {
    TOP: '후드티',
    BOTTOM: '청바지',
  },
  '5': {
    TOP: '니트',
    BOTTOM: '청바지',
  },
  '6': {
    TOP: '트렌치 코트',
    BOTTOM: '기모 바지',
  },
  '7': {
    TOP: '코트',
    BOTTOM: '기모 바지',
  },
  '8': {
    TOP: '패딩',
    BOTTOM: '기모 바지',
  },
};

function getClothesName(
  outfitType: OutfitType,
  names: ClothesIconNames[],
  weatherType: WeatherType
) {
  // 상의 항목
  if (outfitType === 'TOP') {
    return ThumbNailClothesList[weatherType].TOP;
  }

  // 하의 항목
  if (outfitType === 'BOTTOM') {
    return ThumbNailClothesList[weatherType].BOTTOM;
  }

  let ETCName: ClothesIconNames | null = null;

  // 꼭 챙기세요! 항목: 우산이 포함된 경우
  if (outfitType === 'ETC' && names.length >= 2) {
    if (names.includes('접이식 우산')) return '겉옷접이식우산';
    if (names.includes('장우산')) return '겉옷장우산';
  }

  // 꼭 챙기세요! 항목: 우산이 포함되지 않은 경우
  for (const name of names) {
    if (ETCName) break;
    ETCName = clothesIconNameList.has(name) ? name : null;
  }

  return ETCName;
}
