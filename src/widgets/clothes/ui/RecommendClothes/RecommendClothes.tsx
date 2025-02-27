import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import { ClothesIconNames } from '@/entities/clothes';
import { ClothesIcon } from '@/entities/clothes/ui/ClothesIcon/ClothesIcon';
import {
  TemperatureCondition,
  WEATHER_COLORS,
  WeatherTypeName,
} from '@/entities/weather';

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
  adjustWeatherName: WeatherTypeName;
  temperatureCondition: TemperatureCondition;
};

export const RecommendClothes = memo(
  ({
    weather,
    weatherName,
    adjustWeatherName,
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
                  name={getClothesName(outfitType, names, adjustWeatherName)}
                />
              </S.ImageWrap>

              <div>
                <h4>{OUTFIT_TITLE[outfitType]}</h4>
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

const OUTFIT_TITLE: Record<OutfitType, string> = {
  TOP: '상의',
  BOTTOM: '하의',
  ETC: '꼭 챙기세요!',
} as const;

const CHIP_COLOR: Record<OutfitType, (weatherName: WeatherTypeName) => string> =
  {
    TOP: (weatherName) => WEATHER_COLORS[weatherName],
    BOTTOM: () => theme.colors.blueGrey[100],
    ETC: (weatherName) => ETC_CHIP_COLORS_MAP[weatherName],
  };

const ETC_CHIP_COLORS_MAP: Record<WeatherTypeName, string> = {
  sweltering: theme.colors.lime[100],
  hot: theme.colors.lightGreen[100],
  warm: theme.colors.cyan[100],
  moderate: theme.colors.lightBlue[100],
  cool: theme.colors.indigo[100],
  chilly: theme.colors.yellow[100],
  cold: theme.colors.red[100],
  frigid: theme.colors.orange[100],
};

const CLOTHES_COLOR: Record<
  OutfitType,
  (weatherName: WeatherTypeName) => string
> = {
  TOP: (weatherName) => CLOTHES_COLORS_MAP[weatherName]['TOP'],
  BOTTOM: () => theme.colors.blueGrey[500],
  ETC: (weatherName) => CLOTHES_COLORS_MAP[weatherName]['ETC'],
};

const CLOTHES_COLORS_MAP: Record<
  WeatherTypeName,
  Record<Exclude<OutfitType, 'BOTTOM'>, string>
> = {
  sweltering: { TOP: theme.colors.red[300], ETC: theme.colors.lime[200] },
  hot: { TOP: theme.colors.orange[300], ETC: theme.colors.lightGreen[300] },
  warm: { TOP: theme.colors.yellow[300], ETC: theme.colors.cyan[300] },
  moderate: { TOP: theme.colors.lime[300], ETC: theme.colors.lightBlue[300] },
  cool: { TOP: theme.colors.green[300], ETC: theme.colors.indigo[300] },
  chilly: { TOP: theme.colors.cyan[300], ETC: theme.colors.yellow[200] },
  cold: { TOP: theme.colors.blue[300], ETC: theme.colors.red[300] },
  frigid: { TOP: theme.colors.deepPurple[300], ETC: theme.colors.orange[300] },
};

function getClothesName(
  outfitType: OutfitType,
  names: ClothesIconNames[],
  weatherName: WeatherTypeName
) {
  if (outfitType === 'TOP') {
    return CLOTHES_THUMBNAIL[weatherName].TOP;
  }

  if (outfitType === 'BOTTOM') {
    return CLOTHES_THUMBNAIL[weatherName].BOTTOM;
  }

  return CLOTHES_THUMBNAIL[weatherName].ETC(names) ?? null;
}

const CLOTHES_THUMBNAIL: Record<
  WeatherTypeName,
  {
    TOP: ClothesIconNames;
    BOTTOM: ClothesIconNames;
    ETC: (names: ClothesIconNames[]) => ClothesIconNames | undefined;
  }
> = {
  sweltering: {
    TOP: '민소매',
    BOTTOM: '반바지',
    ETC: (names) => {
      if (names.length <= 1) return names[0];
      if (names.includes('접이식 우산')) return '겉옷접이식우산';
      if (names.includes('장우산')) return '겉옷장우산';
    },
  },
  hot: {
    TOP: '반팔티',
    BOTTOM: '슬랙스',
    ETC: (names) => {
      if (names.length <= 1) return names[0];
      if (names.includes('접이식 우산')) return '겉옷접이식우산';
      if (names.includes('장우산')) return '겉옷장우산';
    },
  },
  warm: {
    TOP: '긴팔티',
    BOTTOM: '면바지',
    ETC: (names) => {
      if (names.length <= 1) return names[0];
      if (names.includes('접이식 우산')) return '겉옷접이식우산';
      if (names.includes('장우산')) return '겉옷장우산';
    },
  },
  moderate: {
    TOP: '후드티',
    BOTTOM: '청바지',
    ETC: (names) => {
      if (names.length <= 1) return names[0];
      if (names.includes('접이식 우산')) return '겉옷접이식우산';
      if (names.includes('장우산')) return '겉옷장우산';
    },
  },
  cool: {
    TOP: '니트',
    BOTTOM: '청바지',
    ETC: (names) => {
      if (names.length <= 1) return names[0];
      if (names.includes('접이식 우산')) return '겉옷접이식우산';
      if (names.includes('장우산')) return '겉옷장우산';
    },
  },
  chilly: {
    TOP: '트렌치 코트',
    BOTTOM: '기모 바지',
    ETC: (names) => {
      if (names.includes('접이식 우산')) return '접이식 우산';
      if (names.includes('장우산')) return '장우산';
    },
  },
  cold: {
    TOP: '코트',
    BOTTOM: '기모 바지',
    ETC: (names) => {
      if (names.length <= 1) return '히트텍';
      if (names.includes('접이식 우산')) return '히트텍접이식우산';
      if (names.includes('장우산')) return '히트텍장우산';
    },
  },
  frigid: {
    TOP: '패딩',
    BOTTOM: '기모 바지',
    ETC: (names) => {
      if (names.length <= 1) return '목도리';
      if (names.includes('접이식 우산')) return '목도리접이식우산';
      if (names.includes('장우산')) return '목도리장우산';
    },
  },
};
