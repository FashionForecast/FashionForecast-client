import { useQuery } from '@tanstack/react-query';
import { memo, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FetchError } from '@/widgets/error';

import { getRecommnedClothes } from '@/entities/clothes';
import { TempCondition } from '@/entities/member';
import { WeatherDto } from '@/entities/weather';

import { useAppSelector } from '@/shared/lib/useAppSelector';
import { WeatherType } from '@/shared/types';

import { HomeTab } from '../../model/types';

import ConditionButtonGroup from './ConditionButtonGroup/ConditionButtonGroup';
import { S } from './FashionContent.style';
import Headline from './Headline/Headline';
import LookbookList from './LookbookList/LookbookList';
import RecommendList from './RecommendList/RecommendList';
import RecommendClothesLoading from './RecommendList/RecommendListLoading';

export const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';

const Options = new Map([
  [COOL, COOL],
  [NORMAL, NORMAL],
  [WARM, WARM],
]);

export type WeatherForRecommendClothes = Pick<
  WeatherDto,
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPcp' | 'maximumPop'
>;

type FashionContentProps = {
  tab: Exclude<HomeTab, '날씨'>;
  weather: WeatherForRecommendClothes;
};

export const FashionContent = memo(({ tab, weather }: FashionContentProps) => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const member = useAppSelector((state) => state.member.info);
  const [searchParams] = useSearchParams();
  const tempParamOption = searchParams.get('option');
  const [tempCondition, setTempCondition] = useState<TempCondition>(() =>
    initializeTempCondition(
      weather.extremumTmp,
      member?.tempCondition,
      tempParamOption
    )
  );
  const [originType, changedType] = getWeatehrType(
    weather.extremumTmp,
    tempCondition
  );

  const {
    data: recommedClothes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['clothes', tempCondition, geolocation?.region, weather],
    queryFn: () => getRecommnedClothes({ ...weather, tempCondition }),
  });

  const handleTempConditionChange = useCallback(
    (_e: React.MouseEvent<HTMLElement>, condition: TempCondition) => {
      if (!condition) return;
      setTempCondition(condition);
    },
    []
  );

  if (isError) return <FetchError handleRefetch={refetch} />;
  return (
    <S.Section>
      <Headline weatherType={originType} />

      {tab === '옷' && (
        <>
          {isLoading && <RecommendClothesLoading />}

          {recommedClothes && (
            <RecommendList
              clothes={recommedClothes}
              weatherType={changedType}
            />
          )}
        </>
      )}

      {tab === '룩북' && member && (
        <>
          <LookbookList
            weather={weather}
            weatherType={changedType}
            tempCondition={tempCondition}
          />
        </>
      )}

      <ConditionButtonGroup
        tempCondition={tempCondition}
        extremumTmp={weather.extremumTmp}
        handleTempConditionChange={handleTempConditionChange}
      />
    </S.Section>
  );
});

function getWeatehrType(
  temp: number,
  tempCondition: TempCondition
): WeatherType[] {
  const types = [];
  let type = 8;

  if (temp >= 28) type = 1;
  if (temp >= 23 && temp < 28) type = 2;
  if (temp >= 20 && temp < 23) type = 3;
  if (temp >= 17 && temp < 20) type = 4;
  if (temp >= 12 && temp < 17) type = 5;
  if (temp >= 9 && temp < 12) type = 6;
  if (temp >= 5 && temp < 9) type = 7;

  types.push(String(type));

  if (tempCondition === 'COOL') type = type - 1;
  else if (tempCondition === 'WARM') type = type + 1;

  types.push(String(type));
  return types as WeatherType[];
}

function initializeTempCondition(
  extremumTmp: number,
  userTempCondition?: TempCondition,
  tempParamOption?: TempCondition | string | null
): TempCondition {
  const tempCondition = tempParamOption ? tempParamOption : userTempCondition;

  if (!isValidTempCondition(extremumTmp, tempCondition)) return 'NORMAL';
  return tempCondition ? (tempCondition as TempCondition) : 'NORMAL';
}

function isValidTempCondition(
  extremumTmp: number,
  tempCondition?: TempCondition | string
) {
  if (tempCondition && !Options.has(tempCondition)) return false;

  if (
    (extremumTmp < 5 && tempCondition === 'WARM') ||
    (extremumTmp >= 28 && tempCondition === 'COOL')
  )
    return false;

  return true;
}
