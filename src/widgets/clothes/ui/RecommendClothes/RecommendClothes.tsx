import { Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';

import { TempCondition } from '@/entities/member';
import { WeatherType } from '@/entities/weather';

import { clothesIconNameList } from '@/shared/consts';
import { useAppSelector } from '@/shared/lib';
import { ClothesIconNames, ClothesNames, OutfitType } from '@/shared/types';
import { ClothesIcon } from '@/shared/ui';

import { getRecommendClothes } from '../../api/recommend';
import { WeatherForRecommendClothes } from '../../model/types';

import { C, S } from './RecommendClothes.style';
import { RecommendClothesLoading } from './RecommendClothesLoading';

type RecommendClothesProps = {
  weather: WeatherForRecommendClothes;
  weatherType: WeatherType;
  temperatureCondition: TempCondition;
};

export const RecommendClothes = memo(
  ({ weather, weatherType, temperatureCondition }: RecommendClothesProps) => {
    const geolocation = useAppSelector((state) => state.geolocation.value);

    const { data: recommendClothes, isLoading } = useQuery({
      queryKey: ['clothes', temperatureCondition, geolocation?.region, weather],
      queryFn: () => getRecommendClothes(weather, temperatureCondition),
    });

    if (isLoading) return <RecommendClothesLoading />;
    return (
      <S.RecommendWrap>
        {recommendClothes?.map(({ names, outfitType }) => (
          <C.ClothesCard
            elevation={0}
            key={outfitType}
            $outfitType={outfitType}
          >
            <S.ImageWrap>
              <ClothesIcon
                name={getClothesName(
                  outfitType,
                  names as ClothesNames[],
                  weatherType
                )}
              />
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
  }
);

const outFitName: Record<OutfitType, string> = {
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
  names: ClothesNames[],
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
