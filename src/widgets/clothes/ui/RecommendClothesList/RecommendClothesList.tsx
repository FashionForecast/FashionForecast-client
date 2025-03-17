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
import { CLOTHES_THUMBNAIL } from '../../model/consts';
import { OutfitType, WeatherForRecommendClothes } from '../../model/types';

import { S } from './RecommendClothesList.style';

type RecommendClothesProps = {
  weather: WeatherForRecommendClothes;
  weatherName: WeatherTypeName;
  adjustWeatherName: WeatherTypeName;
  temperatureCondition: TemperatureCondition;
};

export const RecommendClothesList = memo(
  ({
    weather,
    weatherName,
    adjustWeatherName,
    temperatureCondition,
  }: RecommendClothesProps) => {
    const selectedRegion = useAppSelector(
      (state) => state.region.selectedRegion
    );

    const { data: recommendClothes } = useQuery({
      queryKey: [
        'clothes',
        temperatureCondition,
        selectedRegion?.region,
        weather,
      ],
      queryFn: () => getRecommendClothes(weather, temperatureCondition),
    });

    return (
      <S.RecommendWrap>
        {recommendClothes?.map(({ names, outfitType }) => (
          <S.ClothesCard key={outfitType}>
            <S.CardContent>
              <S.ImageWrap>
                <ClothesIcon
                  color={getClothesColor(outfitType, weatherName)}
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
                      color={getChipColor(outfitType, weatherName)}
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

function getChipColor(outfitType: OutfitType, weatherName: WeatherTypeName) {
  return CHIP_COLOR[outfitType](weatherName);
}

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

function getClothesColor(outfitType: OutfitType, weatherName: WeatherTypeName) {
  return CLOTHES_COLOR[outfitType](weatherName);
}

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

  return ETC_THUMBNAIL[weatherName](names) ?? null;
}

const ETC_THUMBNAIL: Record<
  WeatherTypeName,
  (names: ClothesIconNames[]) => ClothesIconNames | undefined
> = {
  sweltering: (names) => {
    if (names.length <= 1) return names[0];
    if (names.includes('접이식 우산')) return '겉옷접이식우산';
    if (names.includes('장우산')) return '겉옷장우산';
  },

  hot: (names) => {
    if (names.length <= 1) return names[0];
    if (names.includes('접이식 우산')) return '겉옷접이식우산';
    if (names.includes('장우산')) return '겉옷장우산';
  },

  warm: (names) => {
    if (names.length <= 1) return names[0];
    if (names.includes('접이식 우산')) return '겉옷접이식우산';
    if (names.includes('장우산')) return '겉옷장우산';
  },

  moderate: (names) => {
    if (names.length <= 1) return names[0];
    if (names.includes('접이식 우산')) return '겉옷접이식우산';
    if (names.includes('장우산')) return '겉옷장우산';
  },

  cool: (names) => {
    if (names.length <= 1) return names[0];
    if (names.includes('접이식 우산')) return '겉옷접이식우산';
    if (names.includes('장우산')) return '겉옷장우산';
  },

  chilly: (names) => {
    if (names.includes('접이식 우산')) return '접이식 우산';
    if (names.includes('장우산')) return '장우산';
    return names[0];
  },

  cold: (names) => {
    if (names.includes('접이식 우산')) return '히트텍접이식우산';
    if (names.includes('장우산')) return '히트텍장우산';
    return '히트텍';
  },

  frigid: (names) => {
    if (names.includes('접이식 우산')) return '목도리접이식우산';
    if (names.includes('장우산')) return '목도리장우산';
    return '목도리';
  },
};
